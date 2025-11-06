import type { ProductShowcaseBlock as ProductShowcaseBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { ProductGridItem } from '@/components/ProductGridItem'
import { Grid } from '@/components/Grid'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const ProductShowcaseBlock: React.FC<
  ProductShowcaseBlockProps & {
    id?: string | number
    className?: string
  }
> = async ({ className, title, displayCount = 8, filterBy = 'featured' }) => {
  const payload = await getPayload({ config: configPromise })

  let where: any = {
    _status: {
      equals: 'published',
    },
  }

  // Apply filtering logic
  if (filterBy === 'featured') {
    where.featured = {
      equals: true,
    }
  }

  const products = await payload.find({
    collection: 'products',
    draft: false,
    overrideAccess: false,
    limit: displayCount,
    select: {
      title: true,
      slug: true,
      gallery: true,
      categories: true,
      priceInUSD: true,
      variants: true,
    },
    where,
    sort: filterBy === 'latest' ? '-createdAt' : 'title',
  })

  if (!products.docs.length) {
    return null
  }

  return (
    <div className={cn('py-16', className)}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {title}
          </h2>
        )}

        <Grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.docs.map((product) => (
            <ProductGridItem key={product.id} product={product} />
          ))}
        </Grid>
      </div>
    </div>
  )
}
