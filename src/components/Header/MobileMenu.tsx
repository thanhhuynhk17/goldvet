'use client'

import type { Header } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useAuth } from '@/providers/Auth'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
  menu: Header['navItems']
  mainNavigation?: Array<{
    label: string
    url: string
    icon?: any
  }>
}

export function MobileMenu({ menu, mainNavigation }: Props) {
  const { user } = useAuth()

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const closeMobileMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, searchParams])

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-red-200 bg-white text-red-600 transition-all duration-200 hover:bg-red-50 hover:border-red-300 hover:text-red-700 hover:shadow-md">
        <MenuIcon className="h-5 w-5" />
      </SheetTrigger>

      <SheetContent side="left" className="w-80 p-0 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200">
        {/* GoldVet Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-5 h-5 border-2 border-red-600 rounded-sm relative">
                <div className="absolute inset-0.5 bg-red-600 rounded-sm"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-0.5 bg-white"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-2.5 bg-white"></div>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold">GOLDVET</h1>
              <p className="text-xs opacity-90">Trao giá trị thật</p>
            </div>
          </div>
          <div className="h-px bg-white/20"></div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">
              Điều hướng
            </h2>
            {mainNavigation?.length ? (
              <nav className="space-y-1">
                {mainNavigation.map((item, index) => {
                  const IconComponent = item.icon
                  const isActive = pathname === item.url
                  return (
                    <Link
                      key={index}
                      href={item.url}
                      className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-red-50 text-red-700 border border-red-200 shadow-sm'
                          : 'text-gray-700 hover:bg-green-50 hover:text-green-700 hover:border hover:border-green-200'
                      }`}
                      onClick={closeMobileMenu}
                    >
                      <div className={`p-2 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600 group-hover:bg-green-100 group-hover:text-green-600'
                      }`}>
                        {IconComponent && <IconComponent className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <span className={`font-medium transition-colors duration-200 ${
                          isActive ? 'text-red-700' : 'text-gray-700 group-hover:text-green-700'
                        }`}>
                          {item.label}
                        </span>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                    </Link>
                  )
                })}
              </nav>
            ) : menu?.length ? (
              <ul className="flex w-full flex-col space-y-2">
                {menu.map((item) => (
                  <li key={item.id}>
                    <CMSLink {...item.link} appearance="link" />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* User Account Section */}
          <div className="border-t border-gray-200 bg-gray-50/50">
            {user ? (
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Tài khoản
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/orders"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-white hover:text-green-700 transition-all duration-200 hover:shadow-sm"
                    onClick={closeMobileMenu}
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <span className="font-medium">Đơn hàng</span>
                  </Link>
                  <Link
                    href="/account/addresses"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-white hover:text-green-700 transition-all duration-200 hover:shadow-sm"
                    onClick={closeMobileMenu}
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="font-medium">Địa chỉ</span>
                  </Link>
                  <Link
                    href="/account"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-white hover:text-green-700 transition-all duration-200 hover:shadow-sm"
                    onClick={closeMobileMenu}
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="font-medium">Quản lý tài khoản</span>
                  </Link>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                  >
                    <Link href="/logout" onClick={closeMobileMenu}>
                      Đăng xuất
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Tài khoản
                </h3>
                <div className="space-y-3">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300"
                  >
                    <Link href="/login" onClick={closeMobileMenu}>
                      Đăng nhập
                    </Link>
                  </Button>
                  <div className="text-center text-sm text-gray-500">hoặc</div>
                  <Button
                    asChild
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Link href="/create-account" onClick={closeMobileMenu}>
                      Tạo tài khoản
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="text-center text-xs text-gray-500">
            © 2025 GoldVet. Tất cả quyền được bảo lưu.
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
