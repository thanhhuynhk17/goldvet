'use client'

import { useState, useTransition, useEffect } from 'react'
import { getProducts } from '@/actions/products'
import { ProductGridItem } from '@/components/ProductGridItem'
import { cn } from '@/utilities/cn'
import type { Product } from '@/payload-types'

type StorePageClientProps = {
  initialProducts: Product[]
  initialFilters: {
    animalType?: string
    formulation?: string
    productType?: string
    searchValue?: string
  }
  initialTotalCount: number
}

export function StorePageClient({
  initialProducts,
  initialFilters,
  initialTotalCount
}: StorePageClientProps) {
  const [filters, setFilters] = useState(initialFilters)
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [totalCount, setTotalCount] = useState(initialTotalCount)
  const [isPending, startTransition] = useTransition()

  // Update URL without causing navigation
  const updateURL = (newFilters: typeof filters) => {
    const url = new URL(window.location.href)

    if (newFilters.animalType) {
      url.searchParams.set('animalType', newFilters.animalType)
    } else {
      url.searchParams.delete('animalType')
    }

    if (newFilters.formulation) {
      url.searchParams.set('formulation', newFilters.formulation)
    } else {
      url.searchParams.delete('formulation')
    }

    if (newFilters.productType) {
      url.searchParams.set('productType', newFilters.productType)
    } else {
      url.searchParams.delete('productType')
    }

    if (newFilters.searchValue) {
      url.searchParams.set('q', newFilters.searchValue)
    } else {
      url.searchParams.delete('q')
    }

    // Update URL without navigation
    window.history.pushState({}, '', url.pathname + url.search)
  }

  // Fetch products when filters change
  const fetchProducts = (newFilters: typeof filters) => {
    startTransition(async () => {
      try {
        const result = await getProducts({
          animalType: newFilters.animalType,
          formulation: newFilters.formulation,
          productType: newFilters.productType,
          searchValue: newFilters.searchValue,
          limit: 12
        })

        setProducts(result.docs)
        setTotalCount(result.totalDocs)
        setFilters(newFilters)

        // Update URL
        updateURL(newFilters)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    })
  }

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters }

    if (key === 'q') {
      newFilters.searchValue = value || undefined
    } else if (key === 'animalType' || key === 'formulation' || key === 'productType') {
      newFilters[key] = value || undefined
    }

    fetchProducts(newFilters)
  }

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const url = new URL(window.location.href)
      const urlFilters = {
        animalType: url.searchParams.get('animalType') || undefined,
        formulation: url.searchParams.get('formulation') || undefined,
        productType: url.searchParams.get('productType') || undefined,
        searchValue: url.searchParams.get('q') || undefined
      }

      // Check if filters actually changed
      const filtersChanged =
        urlFilters.animalType !== filters.animalType ||
        urlFilters.formulation !== filters.formulation ||
        urlFilters.productType !== filters.productType ||
        urlFilters.searchValue !== filters.searchValue

      if (filtersChanged) {
        fetchProducts(urlFilters)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [filters])

  const resultsText = totalCount > 1 ? 'kết quả' : 'kết quả'
  const hasActiveFilters = filters.animalType || filters.formulation || filters.productType || filters.searchValue

  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-700">Cửa Hàng</h1>
        <p className="text-gray-600 text-lg">
          Khám phá và mua sắm các sản phẩm thú y chất lượng cao của Goldvet
        </p>
      </div>

      {/* Simple filter buttons - like bai-viet */}
      <div className="mb-8 flex flex-wrap gap-4">
        <button
          onClick={() => handleFilterChange('animalType', '')}
          disabled={isPending}
          className={cn(
            'px-6 py-3 rounded-full font-medium transition-colors disabled:opacity-50',
            !filters.animalType
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          Tất cả sản phẩm
        </button>
        <button
          onClick={() => handleFilterChange('animalType', 'pig')}
          disabled={isPending}
          className={cn(
            'px-6 py-3 rounded-full font-medium transition-colors disabled:opacity-50',
            filters.animalType === 'pig'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          Heo (Pig)
        </button>
        <button
          onClick={() => handleFilterChange('animalType', 'poultry')}
          disabled={isPending}
          className={cn(
            'px-6 py-3 rounded-full font-medium transition-colors disabled:opacity-50',
            filters.animalType === 'poultry'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          Gia cầm (Poultry)
        </button>
      </div>

      {/* Results */}
      <div className="mb-6">
        {filters.searchValue ? (
          <p className="text-gray-600">
            {totalCount === 0
              ? 'Không tìm thấy sản phẩm nào phù hợp với '
              : `Hiển thị ${products.length} ${resultsText} cho `}
            <span className="font-bold">&ldquo;{filters.searchValue}&rdquo;</span>
          </p>
        ) : (
          <p className="text-gray-600">
            Hiển thị {products.length} sản phẩm trong cửa hàng
          </p>
        )}
      </div>

      {!hasActiveFilters && products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">
            Cửa hàng đang được cập nhật sản phẩm mới.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Vui lòng quay lại sau hoặc liên hệ hotline để được tư vấn.
          </p>
        </div>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductGridItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        hasActiveFilters ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-gray-500">
              Không tìm thấy sản phẩm nào phù hợp với bộ lọc đã chọn.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác.
            </p>
          </div>
        ) : null
      )}
    </div>
  )
}
