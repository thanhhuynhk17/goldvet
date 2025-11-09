'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

export async function getGioiThieuPage() {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
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

export const getCachedGioiThieuPage = unstable_cache(
  getGioiThieuPage,
  ['gioi-thieu-page'],
  {
    tags: ['pages_gioi-thieu'],
  }
)

export async function getAboutPageData() {
  try {
    const page = await getCachedGioiThieuPage()

    if (!page) {
      return {
        success: false,
        error: 'About page not found',
        data: null
      }
    }

    // Extract the aboutPage block data
    const aboutPageBlock = page.layout?.find((block: any) => block.blockType === 'aboutPage') as any

    if (!aboutPageBlock) {
      return {
        success: false,
        error: 'About page block not found',
        data: null
      }
    }

    return {
      success: true,
      data: {
        headerTitle: aboutPageBlock.headerTitle || 'Giới thiệu - Goldvet',
        headerBackgroundColor: aboutPageBlock.headerBackgroundColor || 'green',
        generalIntro: aboutPageBlock.generalIntro || null,
        businessAreas: aboutPageBlock.businessAreas || null,
        history: aboutPageBlock.history || null,
        achievements: aboutPageBlock.achievements || null,
        vision: aboutPageBlock.vision || null,
        mission: aboutPageBlock.mission || null,
        coreValues: aboutPageBlock.coreValues || null,
        partners: aboutPageBlock.partners || null,
      }
    }
  } catch (error) {
    console.error('Error fetching about page data:', error)
    return {
      success: false,
      error: 'Failed to fetch about page data',
      data: null
    }
  }
}
