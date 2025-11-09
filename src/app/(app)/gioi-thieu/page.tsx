import type { Metadata } from 'next'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React from 'react'
import type { Page } from '@/payload-types'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function GioiThieuPage() {
  const page = await getGioiThieuPage()

  if (!page) {
    return notFound()
  }

  const { hero, layout } = page

  // Combine hero and layout blocks for unified rendering
  const allBlocks = hero && hero.type !== 'none' ? [hero, ...layout] : layout

  return (
    <article className="pt-16 pb-24">
      <RenderBlocks blocks={allBlocks} />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGioiThieuPage()

  return generateMeta({ doc: page })
}

const getGioiThieuPage = async () => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: 'gioi-thieu',
      },
      _status: {
        equals: 'published',
      },
    },
  })

  return result.docs?.[0] || null
}
