import { Grid } from '@/components/Grid'
import { ProductGridItem } from '@/components/ProductGridItem'
import { ProductFilters } from '@/components/ProductFilters'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const metadata = {
  description: 'Khám phá danh mục sản phẩm dược thú y của Vinatetco.',
  title: 'Sản Phẩm | Vinatetco',
}

type SearchParams = { [key: string]: string | string[] | undefined }

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function SanPhamPage({ searchParams }: Props) {
  const { animalType, formulation, productType, q: searchValue } = await searchParams
  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    draft: false,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      gallery: true,
      categories: true,
      priceInUSD: true,
      animalType: true,
      formulation: true,
      productType: true,
    },
    where: {
      and: [
        {
          _status: {
            equals: 'published',
          },
        },
        ...(animalType
          ? [
              {
                animalType: {
                  equals: animalType,
                },
              },
            ]
          : []),
        ...(formulation
          ? [
              {
                formulation: {
                  equals: formulation,
                },
              },
            ]
          : []),
        ...(productType
          ? [
              {
                productType: {
                  equals: productType,
                },
              },
            ]
          : []),
        ...(searchValue
          ? [
              {
                or: [
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
                ],
              },
            ]
          : []),
      ],
    },
    sort: '-createdAt',
  })

  const resultsText = products.docs.length > 1 ? 'kết quả' : 'kết quả'

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Sản Phẩm</h1>
        <p className="text-gray-600">
          Khám phá các sản phẩm dược thú y chất lượng cao của Vinatetco
        </p>
      </div>

      {/* Filters */}
      <ProductFilters
        initialFilters={{
          animalType: animalType as string,
          formulation: formulation as string,
          productType: productType as string,
          searchValue: searchValue as string,
        }}
      />

      {/* Results */}
      <div className="mb-6">
        {searchValue ? (
          <p className="text-gray-600">
            {products.docs?.length === 0
              ? 'Không tìm thấy sản phẩm nào phù hợp với '
              : `Hiển thị ${products.docs.length} ${resultsText} cho `}
            <span className="font-bold">&ldquo;{searchValue}&rdquo;</span>
          </p>
        ) : (
          <p className="text-gray-600">
            Hiển thị {products.docs.length} sản phẩm
          </p>
        )}
      </div>

      {!searchValue && !animalType && !formulation && !productType && products.docs?.length === 0 && (
        <p className="text-center py-12 text-gray-500">
          Chưa có sản phẩm nào được thêm vào hệ thống.
        </p>
      )}

      {products?.docs.length > 0 ? (
        <Grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.docs.map((product) => {
            return <ProductGridItem key={product.id} product={product} />
          })}
        </Grid>
      ) : (
        <p className="text-center py-12 text-gray-500">
          Không tìm thấy sản phẩm nào phù hợp với bộ lọc đã chọn.
        </p>
      )}
    </div>
  )
}
