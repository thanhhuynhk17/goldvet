'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function getNews({
  category = 'all',
  page = 1,
  limit = 12
}: {
  category?: 'all' | 'company' | 'industry'
  page?: number
  limit?: number
}) {
  const payload = await getPayload({ config: configPromise })

  const where: any = {
    _status: {
      equals: 'published',
    },
  }

  // Apply category filtering
  if (category !== 'all') {
    where.category = {
      equals: category,
    }
  }

  const news = await payload.find({
    collection: 'news',
    draft: false,
    overrideAccess: false,
    limit,
    page,
    select: {
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      category: true,
      publishedDate: true,
    },
    where,
    sort: '-publishedDate',
  })

  return {
    docs: news.docs,
    totalDocs: news.totalDocs,
    totalPages: news.totalPages,
    page: news.page || page,
    hasNextPage: (news.page || page) < news.totalPages,
  }
}
