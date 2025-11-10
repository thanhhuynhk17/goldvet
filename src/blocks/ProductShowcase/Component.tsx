'use client'

import type { ProductShowcaseBlock as ProductShowcaseBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { ProductGridItem } from '@/components/ProductGridItem'
import { getProducts } from '@/actions/products'
import React, { useState, useEffect } from 'react'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import type { Product } from '@/payload-types'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const ProductShowcaseBlock: React.FC<
  ProductShowcaseBlockProps & {
    id?: string | number
    className?: string
  }
> = ({ className, title, displayCount = 8, filterBy = 'featured' }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const result = await getProducts({
          limit: displayCount || 8,
          sort: filterBy === 'latest' ? '-createdAt' : 'title'
        })

        setProducts(result.docs)
      } catch (err) {
        console.error('Failed to fetch products for showcase:', err)
        setError('Failed to load products')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [displayCount, filterBy])

  if (error) {
    return (
      <div className={cn('py-16 bg-gradient-to-b from-white to-green-50', className)}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-600">Error loading products: {error}</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={cn('py-16 bg-gradient-to-b from-white to-green-50', className)}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: displayCount || 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!products.length) {
    return null
  }

  return (
    <div className={cn('py-16 bg-gradient-to-b from-white to-green-50', className)}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
          )}
          <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product: Product) => (
            <ProductGridItem key={product.id} product={product} />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl border-2 border-green-200 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Khám phá thêm sản phẩm
            </h3>
            <p className="text-gray-600 mb-6">
              Xem tất cả sản phẩm thú y chất lượng cao của chúng tôi
            </p>
            <Link
              href="/cua-hang"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              Xem cửa hàng
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
