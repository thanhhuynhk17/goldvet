import type { Footer } from '@/payload-types'

import { FooterMenu } from '@/components/Footer/menu'
import { FooterClient } from '@/components/Footer/FooterClient'
import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { LogoIcon } from '@/components/icons/logo'
import { SocialMediaButtons } from '@/components/SocialMediaButtons'

const { COMPANY_NAME, SITE_NAME } = process.env

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()
  const menu = footer.navItems || []
  const socialLinks = (footer.socialLinks || []).map(link => ({
    ...link,
    label: link.label || undefined
  }))
  const certifications = footer.certifications || []
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700'

  return (
    <footer className="bg-gradient-to-br from-[#006633] to-[#0f6b38] text-sm text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Information */}
          <div className="space-y-4">
            <Link className="flex items-center gap-2 text-white" href="/">
              {footer.companyInfo?.logo && typeof footer.companyInfo.logo === 'object' && 'url' in footer.companyInfo.logo && footer.companyInfo.logo.url ? (
                <img
                  src={footer.companyInfo.logo.url}
                  alt={(footer.companyInfo.name && footer.companyInfo.name !== null) ? footer.companyInfo.name : 'Goldvet'}
                  className="h-8 w-auto"
                />
              ) : (
                <LogoIcon className="h-8 w-8" />
              )}
              <span className="text-xl font-bold">{(footer.companyInfo?.name && footer.companyInfo.name !== null) ? footer.companyInfo.name : 'Goldvet'}</span>
            </Link>
            <p className="text-sm leading-relaxed">
              {footer.companyInfo?.description || 'Chuyên cung cấp các giải pháp chăm sóc sức khỏe động vật toàn diện cho ngành chăn nuôi Việt Nam.'}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Liên Kết</h3>
            <Suspense
              fallback={
                <div className="flex flex-col gap-2">
                  <div className={skeleton} />
                  <div className={skeleton} />
                  <div className={skeleton} />
                  <div className={skeleton} />
                </div>
              }
            >
              <FooterMenu menu={menu} />
            </Suspense>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Liên Hệ</h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-medium">Địa Chỉ:</p>
                <p className="whitespace-pre-line">{footer.contactInfo?.address || '123 Đường ABC, Quận XYZ, TP.HCM, Việt Nam'}</p>
              </div>
              <div>
                <p className="font-medium">Điện Thoại:</p>
                <p>{footer.contactInfo?.phone || '(028) 1234 5678'}</p>
              </div>
              <div>
                <p className="font-medium">Email:</p>
                <p>{footer.contactInfo?.email || 'info@goldvet.vn'}</p>
              </div>
              <div>
                <p className="font-medium">Giờ Làm Việc:</p>
                <p className="whitespace-pre-line">{footer.contactInfo?.businessHours || 'Thứ 2 - Thứ 6: 8:00 - 17:00\nThứ 7: 8:00 - 12:00\nChủ Nhật: Nghỉ'}</p>
              </div>
            </div>
          </div>

          {/* Social Media & Certifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Theo Dõi Chúng Tôi</h3>
            {socialLinks.length > 0 ? (
              <SocialMediaButtons socialLinks={socialLinks} />
            ) : (
              <p className="text-sm">Kết nối với chúng tôi trên mạng xã hội</p>
            )}

            {certifications.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-md font-medium text-white">Chứng Nhận</h4>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert, index) => (
                    <div key={index} className="text-xs">
                      {cert.logo && typeof cert.logo === 'object' && 'url' in cert.logo && cert.logo.url ? (
                        <img
                          src={cert.logo.url}
                          alt={(cert.name && cert.name !== null) ? cert.name : 'Certification'}
                          className="h-8 w-auto"
                          title={(cert.name && cert.name !== null) ? cert.name : 'Certification'}
                        />
                      ) : (
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded">
                          {(cert.name && cert.name !== null) ? cert.name : 'Certification'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar - Client Component */}
      {/* <FooterClient
        showBackToTop={footer.footerSettings?.showBackToTop || false}
        copyrightText={footer.footerSettings?.copyrightText || '© 2025 Goldvet. Tất cả quyền được bảo lưu.'}
      /> */}
    </footer>
  )
}
