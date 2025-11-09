import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest } from 'payload'

import { contactFormData } from './contact-form.js'
import { contactPageData } from './contact-page.js'
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

  // Create placeholder images for veterinary products
  const placeholderImage = await payload.create({
    collection: 'media',
    data: {
      alt: 'Veterinary Product Placeholder',
    },
    file: {
      name: 'placeholder.png',
      data: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64'),
      mimetype: 'image/png',
      size: 68,
    },
  })



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
        galleryImage: placeholderImage,
        metaImage: placeholderImage,
        categories: [thuocThuYCategory],
        relatedProducts: [],
      }),
    }),
    payload.create({
      collection: 'products',
      depth: 0,
      data: productVaccineData({
        galleryImage: placeholderImage,
        metaImage: placeholderImage,
        categories: [vaccineCategory],
        relatedProducts: [],
      }),
    }),
    payload.create({
      collection: 'products',
      depth: 0,
      data: productSupplementData({
        galleryImage: placeholderImage,
        metaImage: placeholderImage,
        categories: [thucAnChanNuoiCategory],
        relatedProducts: [],
      }),
    }),
    payload.create({
      collection: 'products',
      depth: 0,
      data: productParasiticData({
        galleryImage: placeholderImage,
        metaImage: placeholderImage,
        categories: [thuocThuYCategory],
        relatedProducts: [],
      }),
    }),
    payload.create({
      collection: 'products',
      depth: 0,
      data: productAquacultureData({
        galleryImage: placeholderImage,
        metaImage: placeholderImage,
        categories: [thuocThuYCategory],
        relatedProducts: [],
      }),
    }),
    payload.create({
      collection: 'products',
      depth: 0,
      data: productPetData({
        galleryImage: placeholderImage,
        metaImage: placeholderImage,
        categories: [thuocThuYCategory],
        relatedProducts: [],
      }),
    }),
  ])

  payload.logger.info(`— Seeding news...`)

  const [
    newsCompany,
    newsIndustry,
    newsVaccine,
    newsOrganic,
    newsPartnership,
    newsExport,
    newsIndustryLivestock,
  ] = await Promise.all([
    payload.create({
      collection: 'news',
      depth: 0,
      data: {
        ...newsMycoplasmaData({
          featuredImage: placeholderImage,
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
          featuredImage: placeholderImage,
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
          featuredImage: placeholderImage,
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
          featuredImage: placeholderImage,
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
          featuredImage: placeholderImage,
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
          featuredImage: placeholderImage,
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
          featuredImage: placeholderImage,
          categories: [],
        }),
        _status: 'published',
      },
    }),
  ])

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData(),
  })

  payload.logger.info(`— Seeding pages...`)

  const [_, contactPage, gioiThieuPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: homeStaticData(),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: contactPageData({
        contactForm: contactForm,
      }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: gioiThieuData(),
    }),
  ])

  payload.logger.info(`— Seeding addresses...`)

  const customerUSAddress = await payload.create({
    collection: 'addresses',
    depth: 0,
    data: {
      customer: customer.id,
      ...(baseAddressUSData as Address),
    },
  })

  const customerUKAddress = await payload.create({
    collection: 'addresses',
    depth: 0,
    data: {
      customer: customer.id,
      ...(baseAddressUKData as Address),
    },
  })

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

  let succeededTransactionID: number | string = succeededTransaction.id

  if (payload.db.defaultIDType === 'text') {
    succeededTransactionID = `"${succeededTransactionID}"`
  }

  payload.logger.info(`— Seeding carts...`)

  // This cart is open as it's created now
  const openCart = await payload.create({
    collection: 'carts',
    data: {
      customer: customer.id,
      currency: 'USD',
      items: [
        {
          product: productVeterinary.id,
          quantity: 1,
        },
      ],
    },
  })

  const oldTimestamp = new Date('2023-01-01T00:00:00Z').toISOString()

  // Cart is abandoned because it was created long in the past
  const abandonedCart = await payload.create({
    collection: 'carts',
    data: {
      currency: 'USD',
      createdAt: oldTimestamp,
      items: [
        {
          product: productVaccine.id,
          quantity: 1,
        },
      ],
    },
  })

  // Cart is purchased because it has a purchasedAt date
  const completedCart = await payload.create({
    collection: 'carts',
    data: {
      customer: customer.id,
      currency: 'USD',
      purchasedAt: new Date().toISOString(),
      subtotal: 7499,
      items: [
        {
          product: productVeterinary.id,
          quantity: 1,
        },
        {
          product: productVaccine.id,
          quantity: 1,
        },
      ],
    },
  })

  let completedCartID: number | string = completedCart.id

  if (payload.db.defaultIDType === 'text') {
    completedCartID = `"${completedCartID}"`
  }

  payload.logger.info(`— Seeding orders...`)

  const orderInCompleted = await payload.create({
    collection: 'orders',
    data: {
      amount: 7499,
      currency: 'USD',
      customer: customer.id,
      shippingAddress: baseAddressUSData,
      items: [
        {
          product: productVeterinary.id,
          quantity: 1,
        },
        {
          product: productVaccine.id,
          quantity: 1,
        },
      ],
      status: 'completed',
      transactions: [succeededTransaction.id],
    },
  })

  const orderInProcessing = await payload.create({
    collection: 'orders',
    data: {
      amount: 7499,
      currency: 'USD',
      customer: customer.id,
      shippingAddress: baseAddressUSData,
      items: [
        {
          product: productVeterinary.id,
          quantity: 1,
        },
        {
          product: productVaccine.id,
          quantity: 1,
        },
      ],
      status: 'processing',
      transactions: [succeededTransaction.id],
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
              label: 'LIÊN HỆ NGAY',
              url: '/lien-he-ngay',
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
              label: 'LIÊN HỆ NGAY',
              url: '/lien-he-ngay',
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
