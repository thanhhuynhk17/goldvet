import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
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
      title: 'GoldVet',
      description: 'Bài viết từ GoldVet',
    }
  }

  const news = await queryNewsBySlug({ slug })

  return {
    title: news?.title ? `${news.title} | GoldVet` : 'GoldVet',
    description: news?.excerpt || 'Bài viết từ GoldVet',
    openGraph: {
      title: news?.title || 'GoldVet',
      description: news?.excerpt || 'Bài viết từ GoldVet',
      images: news?.featuredImage && typeof news.featuredImage === 'object' && news.featuredImage.url
        ? [{ url: news.featuredImage.url }]
        : [],
    },
  }
}

export default async function NewsArticlePage({ params }: Args) {
  const { slug } = await params

  if (!slug) {
    return notFound()
  }

  const news = await queryNewsBySlug({ slug })

  if (!news) {
    return notFound()
  }

  // Fetch the bai-viet page to get its shared hero
  const baiVietPage = await queryBaiVietPage()

  // Use the bai-viet page hero for all article pages
  const hero = baiVietPage?.hero || {
    type: 'lowImpact',
    richText: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [{ type: 'text', text: 'Bài Viết & Tin Tức', version: 1 }],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h1',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [{
              type: 'text',
              text: 'Cập nhật những bài viết và tin tức mới nhất từ GoldVet và ngành dược thú y Việt Nam',
              version: 1
            }],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  }

  // Get layout from news object or use default
  const rawLayout = (news as any).layout || [
    {
      blockType: 'newsArticle',
      showCategory: true,
      showDate: true,
      showExcerpt: true,
      showFeaturedImage: true,
      backToNewsText: '← Quay lại bài viết',
      backToNewsUrl: '/bai-viet',
    },
  ]

  // Ensure newsArticle blocks have the news data
  const layout = rawLayout.map((block: any) => {
    if (block.blockType === 'newsArticle') {
      return {
        ...block,
        news: news, // Inject news data into newsArticle blocks
      }
    }
    return block
  })

  return (
    <article className="pt-16 pb-24">
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
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

const queryBaiVietPage = async () => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      slug: {
        equals: 'bai-viet',
      },
    },
  })

  return result.docs?.[0] || null
}
