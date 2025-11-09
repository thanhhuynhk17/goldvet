import type { Metadata } from 'next'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { homeStaticData } from '@/endpoints/seed/home-static'
import React from 'react'

import type { Page } from '@/payload-types'
import { notFound } from 'next/navigation'
import { Grid } from '@/components/Grid'
import { ProductGridItem } from '@/components/ProductGridItem'
import { ProductFilters } from '@/components/ProductFilters'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/cn'
import { getNews } from '@/actions/news'
import { getProducts } from '@/actions/products'
import { NewsGridPagination } from '@/components/NewsGridClient'
import { NewsPageClient } from '@/components/NewsPageClient'
import { StorePageClient } from '@/components/StorePageClient'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  // Routes that have dedicated page handlers and should not be handled by this dynamic route
  const dedicatedRoutes = [
    'account',
    'orders',
    'checkout',
    'create-account',
    'find-order',
    'forgot-password',
    'login',
    'logout',
    'next',
    'products',
    'shop'
  ]

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home' && !dedicatedRoutes.includes(doc.slug)
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ params, searchParams }: Args) {
  const { slug = 'home' } = await params
  const url = '/' + slug

  const page = await queryPageBySlug({
    slug,
  })

  // // Remove this code once your website is seeded
  // if (!page && slug === 'home') {
  //   page = homeStaticData() as Page
  // }

  if (!page) {
    return notFound()
  }

  // Special handling for cua-hang (store) page with product filtering
  if (slug === 'cua-hang') {
    return <StorePage searchParams={searchParams} page={page} />
  }

  // Special handling for bai-viet (news) page with category filtering
  if (slug === 'bai-viet') {
    return <NewsPage searchParams={searchParams} page={page} />
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

// Store page component with client-side product filtering
async function StorePage({ searchParams, page }: { searchParams?: Promise<any>, page: Page }) {
  const params = searchParams ? await searchParams : {}
  const { animalType, formulation, productType, q: searchValue } = params

  // Fetch initial products for server-side rendering
  const productsData = await getProducts({
    animalType: animalType as string,
    formulation: formulation as string,
    productType: productType as string,
    searchValue: searchValue as string,
    limit: 12
  })

  return (
    <article className="pt-16 pb-24">
      <RenderHero {...page.hero} />

      {/* Client-side filtering */}
      <StorePageClient
        initialProducts={productsData.docs}
        initialFilters={{
          animalType: animalType as string,
          formulation: formulation as string,
          productType: productType as string,
          searchValue: searchValue as string,
        }}
        initialTotalCount={productsData.totalDocs}
      />
    </article>
  )
}

// News page component with client-side category filtering and pagination
async function NewsPage({ searchParams, page }: { searchParams?: Promise<any>, page: Page }) {
  const params = searchParams ? await searchParams : {}
  const { category, page: currentPage = '1' } = params

  // Fetch initial articles for server-side rendering
  const articlesData = await getNews({
    category: (category as 'all' | 'company' | 'industry') || 'all',
    page: parseInt(currentPage as string),
    limit: 4  // Show 4 articles per page
  })

  return (
    <article className="pt-16 pb-24">
      <RenderHero {...page.hero} />

      {/* Client-side filtering and pagination */}
      <NewsPageClient
        initialArticles={articlesData.docs}
        initialCategory={(category as 'all' | 'company' | 'industry') || 'all'}
        initialPage={parseInt(currentPage as string)}
        initialTotalPages={articlesData.totalPages}
        initialTotalCount={articlesData.totalDocs}
      />
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = 'home' } = await params

  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        ...(draft ? [] : [{ _status: { equals: 'published' } }]),
      ],
    },
  })

  return result.docs?.[0] || null
}
