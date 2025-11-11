import React from 'react'
import type { Product } from '@/payload-types'
import VinavetcoProductDetail from '@/components/product/VinavetcoProductDetail'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

interface ProductDetailProps {
  product: string | Product // Can be product ID or full product object
}

export const ProductDetail: React.FC<ProductDetailProps> = async ({ product }) => {
  // If product is already a full object, use it directly
  if (typeof product === 'object' && product !== null && 'id' in product) {
    return <VinavetcoProductDetail product={product} />
  }

  // If product is just an ID, fetch the full product data
  if (typeof product === 'string') {
    const payload = await getPayload({ config: configPromise })
    const productData = await payload.findByID({
      collection: 'products',
      id: product,
      depth: 3,
    })

    if (!productData) {
      return notFound()
    }

    return <VinavetcoProductDetail product={productData as Product} />
  }

  return notFound()
}
