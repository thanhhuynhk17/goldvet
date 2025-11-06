import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { homeStaticData } from '@/endpoints/seed/home-static'
import React from 'react'
import type { Metadata } from 'next'

import type { Page } from '@/payload-types'

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

  // Override with vinavetco homepage layout
  if (page) {
    page.layout = [
      {
        blockType: 'heroCarousel',
        blockName: 'Hero Carousel',
        slides: [
          {
            title: 'Công Ty Thuốc Thú Y TW1',
            subtitle: 'Hơn 50 năm kinh nghiệm trong ngành dược thú y Việt Nam',
            link: {
              label: 'Khám phá sản phẩm',
              url: '/san-pham'
            }
          },
          {
            title: 'Chất Lượng GMP-WHO',
            subtitle: 'Đạt tiêu chuẩn quốc tế về sản xuất dược phẩm',
            link: {
              label: 'Tìm hiểu thêm',
              url: '/ve-chung-toi'
            }
          },
          {
            title: 'Phục Vụ Nông Nghiệp Việt Nam',
            subtitle: 'Giải pháp toàn diện cho chăn nuôi và thủy sản',
            link: {
              label: 'Xem dịch vụ',
              url: '/dich-vu'
            }
          },
          {
            title: 'Đối Tác Tin Cậy',
            subtitle: 'Hợp tác cùng các doanh nghiệp hàng đầu',
            link: {
              label: 'Liên hệ chúng tôi',
              url: '/lien-he'
            }
          }
        ]
      },
      {
        blockType: 'statistics',
        blockName: 'Company Statistics',
        stats: [
          {
            number: '50+',
            label: 'Năm',
            description: 'Kinh nghiệm trong ngành'
          },
          {
            number: '1000+',
            label: 'Sản phẩm',
            description: 'Đa dạng chủng loại'
          },
          {
            number: '50+',
            label: 'Quốc gia',
            description: 'Xuất khẩu trên thế giới'
          },
          {
            number: '10000+',
            label: 'Khách hàng',
            description: 'Tin tưởng sử dụng'
          }
        ]
      },
      {
        blockType: 'productShowcase',
        blockName: 'Featured Products',
        title: 'Sản phẩm nổi bật',
        displayCount: 8,
        filterBy: 'featured'
      },
      {
        blockType: 'newsGrid',
        blockName: 'Latest News',
        title: 'Tin tức & Sự kiện',
        category: 'all',
        displayCount: 6
      }
    ]
  }

  return (
    <article className="min-h-screen">
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
