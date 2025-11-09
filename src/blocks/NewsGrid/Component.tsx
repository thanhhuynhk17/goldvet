import type { NewsGridBlock as NewsGridBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import React from 'react'

export const NewsGridBlock: React.FC<
  NewsGridBlockProps & {
    id?: string | number
    className?: string
  }
> = async ({ className, title, category = 'all', displayCount = 6 }) => {
  const payload = await getPayload({ config: configPromise })

  const where: any = {
    _status: {
      equals: 'published',
    },
  }

  // Apply category filtering
  if (category !== 'all') {
    where.category = {
      equals: category,
    }
  }

  const news = await payload.find({
    collection: 'news',
    draft: false,
    overrideAccess: false,
    limit: displayCount || 6,
    select: {
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      category: true,
      publishedDate: true,
    },
    where,
    sort: '-publishedDate',
  })

  if (!news.docs.length) {
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className={cn('py-16', className)}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.docs.map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {article.featuredImage && typeof article.featuredImage === 'object' && article.featuredImage.url && (
                <div className="aspect-video relative">
                  <Media
                    resource={article.featuredImage}
                    className="object-cover"
                    fill
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    article.category === 'company'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {article.category === 'company' ? 'Tin GoldVet' : 'Tin ngành'}
                  </span>
                  {article.publishedDate && (
                    <time className="text-sm text-gray-500">
                      {formatDate(article.publishedDate)}
                    </time>
                  )}
                </div>

                <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                  <Link
                    href={`/bai-viet/${article.slug}`}
                    className="hover:text-green-600 transition-colors"
                  >
                    {article.title}
                  </Link>
                </h3>

                {article.excerpt && (
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                )}

                <Link
                  href={`/bai-viet/${article.slug}`}
                  className="text-green-600 hover:text-green-800 font-medium text-sm"
                >
                  Đọc thêm →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {news.totalDocs > (displayCount || 6) && (
          <div className="text-center mt-12">
            <Link
              href="/bai-viet"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Xem tất cả bài viết
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
