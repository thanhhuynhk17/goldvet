import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import Link from 'next/link'
import type { News } from '@/payload-types'

export type NewsArticleProps = {
  showCategory?: boolean
  showDate?: boolean
  showExcerpt?: boolean
  showFeaturedImage?: boolean
  backToNewsText?: string
  backToNewsUrl?: string
  news: News // The news article data passed from the page
}

export function NewsArticle({
  showCategory = true,
  showDate = true,
  showExcerpt = true,
  showFeaturedImage = true,
  backToNewsText = '← Quay lại bài viết',
  backToNewsUrl = '/bai-viet',
  news,
}: NewsArticleProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back to news link - moved to top left */}
        <div className="mb-8">
          <Link
            href={backToNewsUrl}
            className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
          >
            {backToNewsText}
          </Link>
        </div>

        {/* Featured image */}
        {showFeaturedImage && news.featuredImage && typeof news.featuredImage === 'object' && news.featuredImage.url && (
          <div className="mb-8">
            <Media
              resource={news.featuredImage}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Article excerpt */}
        {showExcerpt && news.excerpt && (
          <div className="mb-6">
            <p className="text-2xl text-gray-700 font-semibold leading-relaxed text-center">
              {news.excerpt}
            </p>
          </div>
        )}

        {/* Article content */}
        <div className="prose prose-lg max-w-none">
          <RichText data={news.content} enableGutter={false} />
        </div>
      </div>
    </div>
  )
}
