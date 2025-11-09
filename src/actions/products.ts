'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function getProductsByCategory(category?: string, limit: number = 12) {
  try {
    const payload = await getPayload({ config: configPromise })

    const where: any = {
      _status: { equals: 'published' }
    }

    // Apply category filtering if specified
    if (category && category !== 'all') {
      where.categories = {
        slug: { equals: category }
      }
    }

    const result = await payload.find({
      collection: 'products',
      draft: false,
      overrideAccess: false,
      select: {
        id: true,
        title: true,
        slug: true,
        gallery: true,
        categories: true,
        priceInUSD: true,
        variants: true,
      },
      where,
      sort: 'title',
      limit: Math.min(limit, 20) // Max 20 items
    })

    return {
      success: true,
      data: result.docs
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      success: false,
      error: 'Failed to fetch products',
      data: []
    }
  }
}
