import { getCachedGlobal } from '@/utilities/getGlobals'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import './index.css'
import { HeaderClient } from './index.client'

export async function Header() {
  const header = await getCachedGlobal('header', 1)()

  // Fetch home page to get logo from meta field
  const payload = await getPayload({ config: configPromise })
  const homePage = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1,
    pagination: false,
    where: {
      slug: { equals: 'home' },
      _status: { equals: 'published' }
    },
  }).then(result => result.docs?.[0] || null)

  return <HeaderClient header={header} homePage={homePage} />
}
