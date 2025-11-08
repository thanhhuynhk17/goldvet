'use client'

import { cn } from '@/utilities/cn'
import { ProductGridItem } from '@/components/ProductGridItem'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import AutoScroll from 'embla-carousel-auto-scroll'
import React, { useState, useEffect } from 'react'

interface ProductSectionBlockProps {
  title?: string
  displayCount?: number
  className?: string
}

interface Category {
  id: string
  name: string
  icon: string
  slug: string
}

const categories: Category[] = [
  {
    id: 'pig',
    name: 'Sản phẩm cho heo',
    icon: '🐷',
    slug: 'heo'
  },
  {
    id: 'poultry',
    name: 'Sản phẩm cho gia cầm, thủy cầm',
    icon: '🐔',
    slug: 'gia-cam'
  },
  {
    id: 'cattle',
    name: 'Sản phẩm cho trâu bò',
    icon: '🐄',
    slug: 'trau-bo'
  },
  {
    id: 'fish',
    name: 'Sản phẩm cho tôm cá',
    icon: '🐟',
    slug: 'tom-ca'
  },
  {
    id: 'pet',
    name: 'Sản phẩm cho thú cưng',
    icon: '🐕',
    slug: 'thu-cung'
  }
]

export const ProductSectionBlock: React.FC<ProductSectionBlockProps> = ({
  title = 'Sản phẩm',
  displayCount = 8,
  className
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)

        // Create query parameters for API call
        const params = new URLSearchParams()
        params.append('limit', Math.max(displayCount || 8, 12).toString()) // Ensure at least 12 products for smooth scrolling
        params.append('status', 'published')

        if (activeCategory !== 'all') {
          const categorySlug = categories.find(cat => cat.id === activeCategory)?.slug
          if (categorySlug) {
            params.append('category', categorySlug)
          }
        }

        const response = await fetch(`/api/products?${params.toString()}`)
        if (response.ok) {
          const data = await response.json()
          const fetchedProducts = data.docs || []

          // Duplicate products to create smooth scrolling effect (like existing Carousel component)
          const duplicatedProducts = [...fetchedProducts, ...fetchedProducts, ...fetchedProducts]

          setProducts(duplicatedProducts)
        } else {
          console.error('Failed to fetch products')
          setProducts([])
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [activeCategory, displayCount])

  return (
    <section className={cn('py-16 bg-white', className)}>
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-green-700 mb-4">
            {title}
          </h2>
          <div className="w-12 h-1 bg-green-600 mx-auto"></div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={cn(
              'px-6 py-2 rounded-full border-2 font-semibold transition-all duration-200 flex items-center gap-2',
              activeCategory === 'all'
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-green-700 border-green-600 hover:bg-green-50'
            )}
          >
            <span>🏠</span>
            <span>Tất cả</span>
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'px-6 py-2 rounded-full border-2 font-semibold transition-all duration-200 flex items-center gap-2',
                activeCategory === category.id
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-green-700 border-green-600 hover:bg-green-50'
              )}
            >
              <span>{category.icon}</span>
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden">{category.icon}</span>
            </button>
          ))}
        </div>

        {/* Products Carousel */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="relative px-12 group">
              <Carousel
                className="w-full"
                opts={{
                  align: 'start',
                  loop: true,
                }}
                plugins={[
                  AutoScroll({
                    playOnInit: true,
                    speed: 1,
                    stopOnInteraction: true,
                    stopOnMouseEnter: true,
                  }),
                ]}
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {products.map((product) => (
                    <CarouselItem
                      key={product.id}
                      className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <div className="p-1">
                        <ProductGridItem product={product} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 bg-green-600 hover:bg-green-700 border-green-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CarouselNext className="right-0 bg-green-600 hover:bg-green-700 border-green-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Carousel>
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:shadow-lg group">
                <span>Xem thêm</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Không có sản phẩm nào trong danh mục này.</p>
          </div>
        )}
      </div>
    </section>
  )
}
