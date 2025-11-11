import type { Metadata } from 'next'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'
import type { Page, Product } from '@/payload-types'
import { ProductDetail } from '@/blocks/ProductDetail/Component'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = 'cua-hang' } = await params

  // Check if it's a product first
  const product = await queryProductBySlug(slug)
  if (product) {
    const gallery = product.gallery?.filter((item) => typeof item.image === 'object') || []
    const metaImage = typeof product.meta?.image === 'object' ? product.meta?.image : undefined
    const canIndex = product._status === 'published'
    const seoImage = metaImage || (gallery.length ? (gallery[0]?.image as any) : undefined)

    return {
      description: product.meta?.description || '',
      openGraph: seoImage?.url
        ? {
            images: [
              {
                alt: seoImage?.alt,
                height: seoImage.height!,
                url: seoImage?.url,
                width: seoImage.width!,
              },
            ],
          }
        : null,
      robots: {
        follow: canIndex,
        googleBot: {
          follow: canIndex,
          index: canIndex,
        },
        index: canIndex,
      },
      title: product.meta?.title || product.title,
    }
  }

  // Fall back to page metadata
  const page = await queryPageBySlug(slug)
  if (page) {
    return generateMeta({ doc: page })
  }
  return {}
}

export default async function CuaHangSlugPage({ params }: Args) {
  const { slug = 'cua-hang' } = await params

  // First check if this is a product slug
  const product = await queryProductBySlug(slug)
  if (product) {
    // Render product detail page
    return (
      <article className="pt-16 pb-24">
        <ProductDetail product={product} />
      </article>
    )
  }

  // If not a product, check if it's a page
  const page = await queryPageBySlug(slug)
  if (!page) {
    return notFound()
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

const queryProductBySlug = async (slug: string): Promise<Product | null> => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
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

const queryPageBySlug = async (slug: string): Promise<Page | null> => {
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
