import type { Product, Variant } from '@/payload-types'

import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/cn'

type Props = {
  product: Partial<Product>
}

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { gallery, priceInUSD, title, animalType, formulation, productType } = product

  let price = priceInUSD

  const variants = product.variants?.docs

  if (variants && variants.length > 0) {
    const variant = variants[0]
    if (
      variant &&
      typeof variant === 'object' &&
      variant?.priceInUSD &&
      typeof variant.priceInUSD === 'number'
    ) {
      price = variant.priceInUSD
    }
  }

  const image =
    gallery?.[0]?.image && typeof gallery[0]?.image !== 'string' ? gallery[0]?.image : false

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group cursor-pointer"
    >
      <Link href={`/cua-hang/${product.slug}`} className="block">
        <div className="relative h-64 overflow-hidden bg-gray-100">
          {image ? (
            <img
              src={(image as any)?.url || ''}
              alt={title || 'Product image'}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              Xem chi tiết
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                {productType || 'Sản phẩm'}
              </p>
              <h3 className="text-lg font-bold text-gray-900 mt-2 line-clamp-2">
                {title}
              </h3>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {typeof product.description === 'string'
              ? product.description
              : 'Mô tả sản phẩm'}
          </p>

          {/* Star Ratings */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < 4 // Mock 4-star rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">4.8</span>
          </div>

          {/* Product Badges */}
          <div className="flex gap-2 flex-wrap">
            {animalType && (
              <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                {animalType}
              </span>
            )}
            {formulation && (
              <span className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium">
                {formulation}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
