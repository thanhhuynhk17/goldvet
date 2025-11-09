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
