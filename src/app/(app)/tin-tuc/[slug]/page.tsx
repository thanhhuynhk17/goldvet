import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const news = await payload.find({
    collection: 'news',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = news.docs
    ?.map(({ slug }) => {
      return { slug }
    })

  return params || []
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params

  if (!slug) {
    return {
      title: 'Vinatetco',
      description: 'Tin tức từ Vinatetco',
    }
  }

  const news = await queryNewsBySlug({ slug })

  return {
    title: news?.title ? `${news.title} | Vinatetco` : 'Vinatetco',
    description: news?.excerpt || 'Tin tức từ Vinatetco',
    openGraph: {
      title: news?.title || 'Vinatetco',
      description: news?.excerpt || 'Tin tức từ Vinatetco',
      images: news?.featuredImage && typeof news.featuredImage === 'object' && news.featuredImage.url
        ? [{ url: news.featuredImage.url }]
        : [],
    },
  }
}

export default async function NewsPage({ params }: Args) {
  const { slug } = await params

  if (!slug) {
    return notFound()
  }

  const news = await queryNewsBySlug({ slug })

  if (!news) {
    return notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <article className="min-h-screen">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                news.category === 'company'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {news.category === 'company' ? 'Tin Vinatetco' : 'Tin ngành'}
              </span>
              {news.publishedDate && (
                <time className="text-sm opacity-90">
                  {formatDate(news.publishedDate)}
                </time>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{news.title}</h1>
            {news.excerpt && (
              <p className="text-xl opacity-90">{news.excerpt}</p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Featured image */}
          {news.featuredImage && typeof news.featuredImage === 'object' && news.featuredImage.url && (
            <div className="mb-8">
              <Media
                resource={news.featuredImage}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Article content */}
          <div className="prose prose-lg max-w-none">
            <RichText data={news.content} enableGutter={false} />
          </div>

          {/* Back to news link */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/tin-tuc"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Quay lại tin tức
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

const queryNewsBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'news',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        ...(draft ? [] : [{ _status: { equals: 'published' } }]),
      ],
    },
  })

  return result.docs?.[0] || null
}
