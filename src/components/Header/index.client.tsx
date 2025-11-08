'use client'
import { CMSLink } from '@/components/Link'
import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'

import { MobileMenu } from './MobileMenu'
import type { Header } from 'src/payload-types'

import { LogoIcon } from '@/components/icons/logo'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/cn'
import { Search, Languages, Home } from 'lucide-react'

type Props = {
  header: Header
}

export function HeaderClient({ header }: Props) {
  const menu = header.navItems || []
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Vinatetco navigation menu items with icons
  const vinatetcoMenu = [
    { label: 'Trang chủ', url: '/', icon: Home },
    { label: 'Giới thiệu', url: '/gioi-thieu' },
    { label: 'Sản phẩm', url: '/san-pham' },
    { label: 'Tin tức & sự kiện', url: '/tin-tuc' },
    { label: 'Thông tin kỹ thuật', url: '/thong-tin-ky-thuat' },
    { label: 'Quan hệ cổ đông', url: '/quan-he-co-dong' },
    { label: 'Cơ hội nghề nghiệp', url: '/co-hoi-nghe-nghiep' },
    { label: 'Liên hệ', url: '/lien-he' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-lg py-2'
          : 'bg-transparent py-4'
      )}
    >
      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between px-6">
        {/* Logo section - outside rounded container */}
        <div className="flex items-center gap-4 z-10">
          <Link className="flex items-center gap-2" href="/">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300">
              <div className="w-6 h-6 border-2 border-white rounded-sm relative">
                <div className="absolute inset-1 bg-white rounded-sm"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-0.5 bg-red-600"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-3 bg-red-600"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className={cn(
                'text-lg font-bold transition-colors duration-300',
                isScrolled ? 'text-gray-800' : 'text-white drop-shadow-lg'
              )}>
                VINATETCO
              </span>
              <span className={cn(
                'text-xs font-medium transition-colors duration-300',
                isScrolled ? 'text-red-600' : 'text-red-400 drop-shadow-md'
              )}>
                Vì sức khỏe cộng đồng
              </span>
            </div>
          </Link>
        </div>

        {/* Rounded navigation bar - centered */}
        <div className="flex-1 flex justify-center mx-8">
          <div className={cn(
            'rounded-full px-8 py-3 shadow-xl border transition-all duration-300',
            isScrolled
              ? 'bg-white border-gray-200 shadow-lg'
              : 'bg-white/95 backdrop-blur-sm border-white/20'
          )}>
            <ul className="flex items-center gap-6 text-sm font-semibold">
              {vinatetcoMenu.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <li key={index}>
                    <Link
                      href={item.url}
                      className={cn(
                        'relative px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 hover:text-green-600 hover:bg-green-50',
                        {
                          'text-green-600 bg-green-50': pathname === item.url,
                          [isScrolled ? 'text-gray-700' : 'text-gray-700']: pathname !== item.url,
                        }
                      )}
                    >
                      {IconComponent && <IconComponent className="w-4 h-4" />}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                )
              })}

              {/* Functional icons inside rounded bar */}
              <li className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-300">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                  <Search className={cn(
                    'w-4 h-4 transition-colors duration-300',
                    isScrolled ? 'text-gray-600' : 'text-gray-600'
                  )} />
                </button>
                <button className="flex items-center gap-1 px-2 py-1 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
                  <Languages className={cn(
                    'w-3 h-3 transition-colors duration-300',
                    isScrolled ? 'text-gray-600' : 'text-gray-600'
                  )} />
                  <span className={cn(
                    'text-xs font-medium transition-colors duration-300',
                    isScrolled ? 'text-gray-700' : 'text-gray-700'
                  )}>
                    🇬🇧
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Header Container */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* Mobile Logo */}
          <div className="flex items-center gap-2">
            <Link className="flex items-center gap-2" href="/">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 border-2 border-white rounded-sm relative">
                  <div className="absolute inset-0.5 bg-white rounded-sm"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-0.5 bg-red-600"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-2 bg-red-600"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  'text-sm font-bold transition-colors duration-300',
                  isScrolled ? 'text-gray-800' : 'text-white drop-shadow-lg'
                )}>
                  VINATETCO
                </span>
                <span className={cn(
                  'text-xs font-medium transition-colors duration-300',
                  isScrolled ? 'text-red-600' : 'text-red-400 drop-shadow-md'
                )}>
                  Vì sức khỏe cộng đồng
                </span>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <Search className={cn(
                'w-4 h-4 transition-colors duration-300',
                isScrolled ? 'text-gray-600' : 'text-white'
              )} />
            </button>
            <button className="flex items-center gap-1 px-2 py-1 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
              <Languages className={cn(
                'w-3 h-3 transition-colors duration-300',
                isScrolled ? 'text-gray-600' : 'text-white'
              )} />
              <span className={cn(
                'text-xs font-medium transition-colors duration-300',
                isScrolled ? 'text-gray-700' : 'text-white'
              )}>
                🇬🇧
              </span>
            </button>
            {/* Mobile menu button */}
            <MobileMenu menu={menu} vinatetcoMenu={vinatetcoMenu} />
          </div>
        </div>


      </div>
    </header>
  )
}
