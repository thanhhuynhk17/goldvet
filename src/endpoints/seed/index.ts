import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest } from 'payload'

import { contactFormData } from './contact-form.js'
import {
  productVeterinaryData,
  productVaccineData,
  productSupplementData,
  productParasiticData,
  productAquacultureData,
  productPetData
} from './product-veterinary.js'
import {
  newsMycoplasmaData,
  newsIndustryData,
  newsVaccineData,
  newsOrganicData,
  newsPartnershipData,
  newsExportData,
  newsIndustryLivestockData
} from './news.js'
import { homeStaticData } from './home-static.js'
import { gioiThieuData } from './gioi-thieu.js'
import { baiVietData } from './bai-viet.js'
import { cuaHangData } from './cua-hang.js'
import { lienHeData } from './lien-he.js'
import { ImageSeeder, VETERINARY_IMAGES } from './images'
import { Address, Transaction } from '@/payload-types'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'products',
  'news',
  'forms',
  'form-submissions',
  'carts',
  'transactions',
  'addresses',
  'orders',
]

const categories = ['Thuốc Thú Y', 'Vaccine', 'Thức Ăn Chăn Nuôi']

const globals: GlobalSlug[] = ['header', 'footer']

const baseAddressUSData: Transaction['billingAddress'] = {
  title: 'Dr.',
  firstName: 'Otto',
  lastName: 'Octavius',
  phone: '1234567890',
  company: 'Oscorp',
  addressLine1: '123 Main St',
  addressLine2: 'Suite 100',
  city: 'New York',
  state: 'NY',
  postalCode: '10001',
  country: 'US',
}

const baseAddressUKData: Transaction['billingAddress'] = {
  title: 'Mr.',
  firstName: 'Oliver',
  lastName: 'Twist',
  phone: '1234567890',
  addressLine1: '48 Great Portland St',
  city: 'London',
  postalCode: 'W1W 7ND',
  country: 'GB',
}

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  for (const collection of collections) {
    await payload.db.deleteMany({ collection, req, where: {} })
    if (payload.collections[collection].config.versions) {
      await payload.db.deleteVersions({ collection, req, where: {} })
    }
  }

  payload.logger.info(`— Seeding customer and customer data...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'customer@example.com',
      },
    },
  })

  payload.logger.info(`— Seeding customer and categories...`)

  const [
    customer,
    thuocThuYCategory,
    vaccineCategory,
    thucAnChanNuoiCategory,
  ] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Customer',
        email: 'customer@example.com',
        password: 'password',
        roles: ['customer'],
      },
    }),
    ...categories.map((category) =>
      payload.create({
        collection: 'categories',
        data: {
          title: category,
          slug: category.toLowerCase().replace(/\s+/g, '-'),
        },
      }),
    ),
  ])

  // Upload a single goldvet-logo.png image and reuse it for all seeding needs
  const imageSeeder = new ImageSeeder(payload)
  const singleImageConfig = {
    filename: 'goldvet-logo.png',
    alt: 'Goldvet Logo',
    category: 'logo' as const,
    tags: ['logo', 'goldvet']
  }

  payload.logger.info('— Uploading goldvet logo image...')
  const logoImage = await imageSeeder.uploadSingleImage(singleImageConfig)

  // Create an array of the same logo image for all seeding references
  const productImages = Array(12).fill(logoImage)



  payload.logger.info(`— Seeding products...`)

  const [
    productVeterinary,
    productVaccine,
    productSupplement,
    productParasitic,
    productAquaculture,
    productPet,
  ] = await Promise.all([
    payload.create({
      collection: 'products',
      depth: 0,
      data: productVeterinaryData({
        galleryImage: productImages[0], // SIÊU MỌC LÔNG
        metaImage: productImages[0],
        categories: [thuocThuYCategory],
        relatedProducts: [],
      }),
    }),
    payload.create({
      collection: 'products',
      depth: 0,
      data: productVaccineData({
        galleryImage: productImages[1], // Vaccine
        metaImage: productImages[1],
        categories: [vaccineCategory],
        relatedProducts: [],
      }),
    }),
    payload.create({
      collection: 'products',
      depth: 0,
      data: productSupplementData({
        galleryImage: productImages[2], // Vitamin supplement
        metaImage: productImages[2],
        categories: [thucAnChanNuoiCategory],
        relatedProducts: [],
      }),
    }),
    payload.create({
      collection: 'products',
      depth: 0,
      data: productParasiticData({
        galleryImage: productImages[3], // Parasitic medicine
        metaImage: productImages[3],
        categories: [thuocThuYCategory],
        relatedProducts: [],
      }),
    }),
    payload.create({
      collection: 'products',
      depth: 0,
      data: productAquacultureData({
        galleryImage: productImages[4], // Aquaculture medicine
        metaImage: productImages[4],
        categories: [thuocThuYCategory],
        relatedProducts: [],
      }),
    }),
    payload.create({
      collection: 'products',
      depth: 0,
      data: productPetData({
        galleryImage: productImages[5], // Pet medicine
        metaImage: productImages[5],
        categories: [thuocThuYCategory],
        relatedProducts: [],
      }),
    }),
  ])

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData(),
  })

  // Create contact banner image
  const contactBanner = await payload.create({
    collection: 'media',
    data: {
      alt: 'Liên hệ với Goldvet',
    },
    file: {
      name: 'contact-banner.jpg',
      data: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64'),
      mimetype: 'image/jpeg',
      size: 68,
    },
  })

  payload.logger.info(`— Seeding news...`)

  await Promise.all([
    payload.create({
      collection: 'news',
      depth: 0,
      data: {
        ...newsMycoplasmaData({
          featuredImage: productImages[6], // Use joint medicine image for news
          categories: [],
        }),
        _status: 'published',
      },
    }),
    payload.create({
      collection: 'news',
      depth: 0,
      data: {
        ...newsIndustryData({
          featuredImage: productImages[7], // Use vitamin E image for news
          categories: [],
        }),
        _status: 'published',
      },
    }),
    payload.create({
      collection: 'news',
      depth: 0,
      data: {
        ...newsVaccineData({
          featuredImage: productImages[8], // Use pet medicine image for news
          categories: [],
        }),
        _status: 'published',
      },
    }),
    payload.create({
      collection: 'news',
      depth: 0,
      data: {
        ...newsOrganicData({
          featuredImage: productImages[0], // Use vaccine image for news
          categories: [],
        }),
        _status: 'published',
      },
    }),
    payload.create({
      collection: 'news',
      depth: 0,
      data: {
        ...newsPartnershipData({
          featuredImage: productImages[1], // Use antibiotic image for news
          categories: [],
        }),
        _status: 'published',
      },
    }),
    payload.create({
      collection: 'news',
      depth: 0,
      data: {
        ...newsExportData({
          featuredImage: productImages[2], // Use vitamin supplement image for news
          categories: [],
        }),
        _status: 'published',
      },
    }),
    payload.create({
      collection: 'news',
      depth: 0,
      data: {
        ...newsIndustryLivestockData({
          featuredImage: productImages[3], // Use digestive medicine image for news
          categories: [],
        }),
        _status: 'published',
      },
    }),
  ])

  payload.logger.info(`— Seeding pages...`)

  await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: homeStaticData([productImages[6], productImages[7], productImages[8]]), // Pass hero images
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: gioiThieuData(),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: baiVietData(productImages[0]), // Use first product image for bai-viet page
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: cuaHangData(),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: lienHeData({
        contactForm: contactForm,
        contactBanner: contactBanner,
      }),
    }),
  ])



  payload.logger.info(`— Seeding transactions...`)

  const pendingTransaction = await payload.create({
    collection: 'transactions',
    data: {
      currency: 'USD',
      customer: customer.id,
      paymentMethod: 'stripe',
      stripe: {
        customerID: 'cus_123',
        paymentIntentID: 'pi_123',
      },
      status: 'pending',
      billingAddress: baseAddressUSData,
    },
  })

  const succeededTransaction = await payload.create({
    collection: 'transactions',
    data: {
      currency: 'USD',
      customer: customer.id,
      paymentMethod: 'stripe',
      stripe: {
        customerID: 'cus_123',
        paymentIntentID: 'pi_123',
      },
      status: 'succeeded',
      billingAddress: baseAddressUSData,
    },
  })



  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'TRANG CHỦ',
              url: '/',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'CỬA HÀNG',
              url: '/cua-hang',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'BÀI VIẾT',
              url: '/bai-viet',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'LIÊN HỆ',
              url: '/lien-he',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'GIỚI THIỆU',
              url: '/gioi-thieu',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'CHÍNH SÁCH',
              url: '/chinh-sach',
            },
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        companyInfo: {
          name: 'CÔNG TY TNHH NÔNG NGHIỆP TẬP ĐOÀN GOLDVET',
          description: 'Chuyên cung cấp các sản phẩm thú y chính hãng, chất lượng đến tận tay nhà chăn nuôi.',
        },
        contactInfo: {
          address: 'Số 10, ngõ 90 Nam Dư, Phường Lĩnh Nam, Quận Hoàng Mai, Hà Nội',
          phone: '0866 399 380',
          email: 'info@goldvet.vn',
          businessHours: 'Thứ 2 - Thứ 6: 8:00 - 17:00\nThứ 7: 8:00 - 12:00\nChủ Nhật: Nghỉ',
        },
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'TRANG CHỦ',
              url: '/',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'CỬA HÀNG',
              url: '/cua-hang',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'BÀI VIẾT',
              url: '/bai-viet',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'LIÊN HỆ',
              url: '/lien-he',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'GIỚI THIỆU',
              url: '/gioi-thieu',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'CHÍNH SÁCH',
              url: '/chinh-sach',
            },
          },
        ],
        socialLinks: [
          {
            platform: 'facebook',
            url: 'https://facebook.com/goldvet.vn',
            label: 'Theo dõi Goldvet trên Facebook',
          },
          {
            platform: 'youtube',
            url: 'https://youtube.com/@goldvet.vn',
            label: 'Xem video trên YouTube',
          },
        ],
        certifications: [
          {
            name: 'GMP',
            url: 'https://goldvet.vn/certifications/gmp',
          },
          {
            name: 'ISO 9001',
            url: 'https://goldvet.vn/certifications/iso9001',
          },
        ],
        footerSettings: {
          copyrightText: '© 2025 Goldvet. Tất cả quyền được bảo lưu.',
          showBackToTop: true,
        },
      },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}
