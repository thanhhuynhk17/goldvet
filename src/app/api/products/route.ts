import { NextRequest, NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '8')
    const category = searchParams.get('category')
    const status = searchParams.get('status') || 'published'

    const payload = await getPayload({ config: configPromise })

    const where: any = {
      _status: {
        equals: status,
      },
    }

    // Apply category filtering
    if (category) {
      where.categories = {
        slug: {
          equals: category
        }
      }
    }

    const result = await payload.find({
      collection: 'products',
      draft: false,
      overrideAccess: false,
      limit: Math.min(limit, 20), // Max 20 items
      select: {
        title: true,
        slug: true,
        gallery: true,
        categories: true,
        priceInUSD: true,
        variants: true,
      },
      where,
      sort: 'title',
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
