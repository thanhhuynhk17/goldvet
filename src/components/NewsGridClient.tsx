'use client'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/cn'
import Link from 'next/link'

type NewsArticle = {
  id: string | number
  title: string
  slug: string
  excerpt?: string | null
  featuredImage?: any
  category: 'company' | 'industry'
  publishedDate?: string | null
}

type NewsGridPaginationProps = {
  articles: NewsArticle[]
  currentPage: number
  totalPages: number
  category: 'all' | 'company' | 'industry'
  totalCount: number
  isLoading?: boolean
  onPageChange?: (page: number) => void
}

export function NewsGridPagination({
  articles,
  currentPage,
  totalPages,
  category,
  totalCount,
  isLoading = false,
  onPageChange
}: NewsGridPaginationProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Generate pagination links with category preservation
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams()
    if (category !== 'all') {
      params.set('category', category)
    }
    if (page > 1) {
      params.set('page', page.toString())
    }
    return params.toString() ? `/bai-viet?${params.toString()}` : '/bai-viet'
  }

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show pages around current page
      const start = Math.max(1, currentPage - 2)
      const end = Math.min(totalPages, currentPage + 2)

      if (start > 1) {
        pages.push(1)
        if (start > 2) pages.push('...')
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Hiển thị {articles.length} bài viết
            {totalCount > articles.length && ` của ${totalCount} bài viết`}
          </p>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {articles.map((article) => (
                <article key={`article-${article.id}-${article.slug}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                      <span className={cn(
                        'text-xs font-semibold px-2 py-1 rounded',
                        article.category === 'company'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      )}>
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                {/* Previous Button */}
                {currentPage > 1 ? (
                  onPageChange ? (
                    <button
                      onClick={() => onPageChange(currentPage - 1)}
                      disabled={isLoading}
                      className="px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                    >
                      ‹ Trước
                    </button>
                  ) : (
                    <Link
                      href={createPageUrl(currentPage - 1)}
                      className="px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      ‹ Trước
                    </Link>
                  )
                ) : (
                  <span className="px-4 py-2 text-gray-400 cursor-not-allowed">
                    ‹ Trước
                  </span>
                )}

                {/* Page Numbers */}
                {getPageNumbers().map((page, index) => (
                  typeof page === 'number' ? (
                    onPageChange ? (
                      <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        disabled={isLoading}
                        className={cn(
                          'px-4 py-2 rounded-lg transition-colors disabled:opacity-50',
                          page === currentPage
                            ? 'bg-green-600 text-white'
                            : 'text-gray-600 hover:text-green-600 hover:bg-gray-100'
                        )}
                      >
                        {page}
                      </button>
                    ) : (
                      <Link
                        key={page}
                        href={createPageUrl(page)}
                        className={cn(
                          'px-4 py-2 rounded-lg transition-colors',
                          page === currentPage
                            ? 'bg-green-600 text-white'
                            : 'text-gray-600 hover:text-green-600 hover:bg-gray-100'
                        )}
                      >
                        {page}
                      </Link>
                    )
                  ) : (
                    <span key={`ellipsis-${index}`} className="px-2 py-2 text-gray-400">
                      {page}
                    </span>
                  )
                ))}

                {/* Next Button */}
                {currentPage < totalPages ? (
                  onPageChange ? (
                    <button
                      onClick={() => onPageChange(currentPage + 1)}
                      disabled={isLoading}
                      className="px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                    >
                      Sau ›
                    </button>
                  ) : (
                    <Link
                      href={createPageUrl(currentPage + 1)}
                      className="px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Sau ›
                    </Link>
                  )
                ) : (
                  <span className="px-4 py-2 text-gray-400 cursor-not-allowed">
                    Sau ›
                  </span>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">
              Không tìm thấy bài viết nào.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Hãy thử chọn danh mục khác hoặc quay lại sau.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
