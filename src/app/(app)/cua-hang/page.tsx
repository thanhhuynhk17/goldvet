import { Grid } from '@/components/Grid'
import { ProductGridItem } from '@/components/ProductGridItem'
import { ProductFilters } from '@/components/ProductFilters'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const metadata = {
  description: 'Cửa hàng sản phẩm thú y Goldvet - Mua sắm trực tuyến các sản phẩm chất lượng cao cho vật nuôi.',
  title: 'Cửa Hàng | Goldvet - Thuốc Thú Y',
}

type SearchParams = { [key: string]: string | string[] | undefined }

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function CuaHangPage({ searchParams }: Props) {
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
    <div className="container mx-auto px-4 py-8 pt-24 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-700">Cửa Hàng</h1>
        <p className="text-gray-600 text-lg">
          Khám phá và mua sắm các sản phẩm thú y chất lượng cao của Goldvet
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
            Hiển thị {products.docs.length} sản phẩm trong cửa hàng
          </p>
        )}
      </div>

      {!searchValue && !animalType && !formulation && !productType && products.docs?.length === 0 && (
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

      {products?.docs.length > 0 ? (
        <Grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.docs.map((product) => {
            return <ProductGridItem key={product.id} product={product} />
          })}
        </Grid>
      ) : (
        searchValue || animalType || formulation || productType ? (
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
