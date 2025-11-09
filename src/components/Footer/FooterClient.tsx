'use client'
import React from 'react'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

interface FooterClientProps {
  showBackToTop: boolean
  copyrightText: string
}

export function FooterClient({ showBackToTop, copyrightText }: FooterClientProps) {
  return (
    <div className="border-t border-neutral-200 bg-white py-6 dark:border-neutral-700 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm">
            {copyrightText}
          </p>

          <div className="flex items-center gap-6">
            <ThemeSelector />
            {showBackToTop && (
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                ↑ Quay lên đầu trang
              </button>
            )}
          </div>

          <p className="text-sm">
            <a
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              href="https://payloadcms.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by Payload CMS
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
