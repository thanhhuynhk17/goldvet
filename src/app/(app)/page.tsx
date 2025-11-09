import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { homeStaticData } from '@/endpoints/seed/home-static'
import React from 'react'
import type { Metadata } from 'next'

import type { Page } from '@/payload-types'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  let page = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [
        {
          slug: {
            equals: 'home',
          },
        },
        ...(draft ? [] : [{ _status: { equals: 'published' } }]),
      ],
    },
  }).then(result => result.docs?.[0] || null)

  // Use static data if no page exists yet
  if (!page) {
    page = homeStaticData() as Page
  }

  // Banner content is now managed through Payload CMS admin panel
  // Create a page with slug 'home' in the admin panel to manage banner content

  return (
    <article className="relative -mt-24 md:-mt-20">
      {/* Render blocks without padding - hero will handle full height */}
      <RenderBlocks blocks={page?.layout || []} />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: 'home',
      },
    },
  }).then(result => result.docs?.[0] || null)

  return generateMeta({ doc: page })
}
