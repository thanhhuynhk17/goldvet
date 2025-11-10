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

export async function getProducts({
  animalType,
  formulation,
  productType,
  searchValue,
  limit = 12,
  sort = '-createdAt'
}: {
  animalType?: string
  formulation?: string
  productType?: string
  searchValue?: string
  limit?: number
  sort?: string
}) {
  const payload = await getPayload({ config: configPromise })

  const where: any = {
    _status: {
      equals: 'published',
    },
  }

  // Apply filters
  if (animalType) {
    where.animalType = {
      equals: animalType,
    }
  }

  if (formulation) {
    where.formulation = {
      equals: formulation,
    }
  }

  if (productType) {
    where.productType = {
      equals: productType,
    }
  }

  if (searchValue) {
    where.or = [
      {
        title: {
          like: searchValue,
        },
      },
      {
        description: {
          like: searchValue,
        },
      },
    ]
  }

  const products = await payload.find({
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
      animalType: true,
      formulation: true,
      productType: true,
    },
    where,
    sort,
    limit,
  })

  return {
    docs: products.docs,
    totalDocs: products.totalDocs,
    totalPages: products.totalPages,
    page: products.page || 1,
    hasNextPage: (products.page || 1) < products.totalPages,
  }
}
