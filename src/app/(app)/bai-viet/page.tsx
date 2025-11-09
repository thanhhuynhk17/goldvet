import { NewsGridBlock } from '@/blocks/NewsGrid/Component'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import React from 'react'

export const metadata = {
  description: 'Bài viết và tin tức mới nhất từ GoldVet và ngành dược thú y.',
  title: 'Bài Viết & Tin Tức | GoldVet',
}

type SearchParams = { [key: string]: string | string[] | undefined }

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function TinTucPage({ searchParams }: Props) {
  const { category } = await searchParams

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bài Viết & Tin Tức</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Cập nhật những bài viết và tin tức mới nhất từ GoldVet và ngành dược thú y Việt Nam
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category filter */}
        <div className="mb-8 flex flex-wrap gap-4">
          <Link
            href="/bai-viet"
            className={`px-6 py-3 rounded-full font-medium transition-colors ${
              !category
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tất cả bài viết
          </Link>
          <Link
            href="/bai-viet?category=company"
            className={`px-6 py-3 rounded-full font-medium transition-colors ${
              category === 'company'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tin GoldVet
          </Link>
          <Link
            href="/bai-viet?category=industry"
            className={`px-6 py-3 rounded-full font-medium transition-colors ${
              category === 'industry'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tin ngành
          </Link>
        </div>

        {/* News grid */}
        <NewsGridBlock
          blockType="newsGrid"
          blockName="News Grid"
          title=""
          category={(category as 'all' | 'company' | 'industry') || 'all'}
          displayCount={20}
        />
      </div>
    </div>
  )
}
