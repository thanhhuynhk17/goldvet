'use client'

import { useState, useTransition, useEffect } from 'react'
import { getNews } from '@/actions/news'
import { NewsGridPagination } from '@/components/NewsGridClient'
import { cn } from '@/utilities/cn'

type NewsArticle = {
  id: string | number
  title: string
  slug: string
  excerpt?: string | null
  featuredImage?: any
  category: 'company' | 'industry'
  publishedDate?: string | null
}

type NewsPageClientProps = {
  initialArticles: NewsArticle[]
  initialCategory: 'all' | 'company' | 'industry'
  initialPage: number
  initialTotalPages: number
  initialTotalCount: number
}

export function NewsPageClient({
  initialArticles,
  initialCategory,
  initialPage,
  initialTotalPages,
  initialTotalCount
}: NewsPageClientProps) {
  const [category, setCategory] = useState<'all' | 'company' | 'industry'>(initialCategory)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [totalCount, setTotalCount] = useState(initialTotalCount)
  const [isPending, startTransition] = useTransition()

  // Update URL without causing navigation
  const updateURL = (newCategory: 'all' | 'company' | 'industry', newPage: number) => {
    const url = new URL(window.location.href)

    if (newCategory !== 'all') {
      url.searchParams.set('category', newCategory)
    } else {
      url.searchParams.delete('category')
    }

    if (newPage > 1) {
      url.searchParams.set('page', newPage.toString())
    } else {
      url.searchParams.delete('page')
    }

    // Update URL without navigation
    window.history.pushState({}, '', url.pathname + url.search)
  }

  // Fetch articles when category or page changes
  const fetchArticles = (newCategory: 'all' | 'company' | 'industry', newPage: number) => {
    startTransition(async () => {
      try {
        const result = await getNews({
          category: newCategory,
          page: newPage,
          limit: 4
        })

        setArticles(result.docs)
        setTotalPages(result.totalPages)
        setTotalCount(result.totalDocs)
        setCurrentPage(newPage)
        setCategory(newCategory)

        // Update URL
        updateURL(newCategory, newPage)
      } catch (error) {
        console.error('Failed to fetch articles:', error)
      }
    })
  }

  // Handle category change
  const handleCategoryChange = (newCategory: 'all' | 'company' | 'industry') => {
    if (newCategory === category) return
    fetchArticles(newCategory, 1) // Reset to page 1 when changing category
  }

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return
    fetchArticles(category, newPage)
  }

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const url = new URL(window.location.href)
      const urlCategory = (url.searchParams.get('category') as 'all' | 'company' | 'industry') || 'all'
      const urlPage = parseInt(url.searchParams.get('page') || '1')

      if (urlCategory !== category || urlPage !== currentPage) {
        fetchArticles(urlCategory, urlPage)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [category, currentPage])

  return (
    <div>
      {/* Category filter buttons */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-wrap gap-4">
          <button
            onClick={() => handleCategoryChange('all')}
            disabled={isPending}
            className={cn(
              'px-6 py-3 rounded-full font-medium transition-colors disabled:opacity-50',
              category === 'all'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            Tất cả bài viết
          </button>
          <button
            onClick={() => handleCategoryChange('company')}
            disabled={isPending}
            className={cn(
              'px-6 py-3 rounded-full font-medium transition-colors disabled:opacity-50',
              category === 'company'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            Tin GoldVet
          </button>
          <button
            onClick={() => handleCategoryChange('industry')}
            disabled={isPending}
            className={cn(
              'px-6 py-3 rounded-full font-medium transition-colors disabled:opacity-50',
              category === 'industry'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            Tin ngành
          </button>
        </div>
      </div>

      {/* Articles grid with pagination */}
      <NewsGridPagination
        articles={articles}
        currentPage={currentPage}
        totalPages={totalPages}
        category={category}
        totalCount={totalCount}
        isLoading={isPending}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
