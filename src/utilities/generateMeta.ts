import type { Metadata } from 'next'

import type { Page, Product } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'

export const generateMeta = async (args: { doc: Page | Product }): Promise<Metadata> => {
  const { doc } = args || {}

  // Debug: Check environment variable access
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  console.log('🔍 SEO Debug - NEXT_PUBLIC_SERVER_URL:', serverUrl)
  console.log('🔍 SEO Debug - doc?.meta?.image:', doc?.meta?.image)

  const ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc.meta.image !== null &&
    'url' in doc.meta.image &&
    `${serverUrl}${doc.meta.image.url}`

  console.log('🔍 SEO Debug - Generated ogImage:', ogImage)

  const metadata = {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      ...(doc?.meta?.description
        ? {
            description: doc?.meta?.description,
          }
        : {}),
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title: doc?.meta?.title || doc?.title || 'Payload Ecommerce Template',
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title: doc?.meta?.title || doc?.title || 'Payload Ecommerce Template',
  }

  console.log('🔍 SEO Debug - Final metadata:', JSON.stringify(metadata, null, 2))

  return metadata
}
