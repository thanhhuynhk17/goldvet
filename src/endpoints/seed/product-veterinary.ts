import type { Category, Product, VariantOption, VariantType } from '@/payload-types'
import type { Media } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

type ProductArgs = {
  galleryImage: Media
  metaImage: Media
  categories: Category[]
  relatedProducts: Product[]
}

export const productVeterinaryData: (args: ProductArgs) => RequiredDataFromCollectionSlug<'products'> = ({
  galleryImage,
  relatedProducts,
  metaImage,
  categories,
}) => {
  return {
    meta: {
      title: 'Thuốc Kháng Sinh Cho Heo | Vinatetco',
      image: metaImage,
      description: 'Thuốc kháng sinh chất lượng cao dành cho heo, giúp phòng ngừa và điều trị các bệnh nhiễm trùng phổ biến.',
    },
    _status: 'published',
    layout: [],
    categories: categories,
    description: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Thuốc kháng sinh chất lượng cao dành cho heo, giúp phòng ngừa và điều trị các bệnh nhiễm trùng phổ biến.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    gallery: [{ image: galleryImage }],
    title: 'Thuốc Kháng Sinh Cho Heo',
    slug: 'thuoc-khang-sinh-cho-heo',
    priceInUSDEnabled: true,
    priceInUSD: 25.99,
    animalType: 'pig',
    formulation: 'injection',
    productType: 'medication',
    featured: true,
    relatedProducts: relatedProducts,
  }
}

export const productVaccineData: (args: ProductArgs) => RequiredDataFromCollectionSlug<'products'> = ({
  galleryImage,
  relatedProducts,
  metaImage,
  categories,
}) => {
  return {
    meta: {
      title: 'Vaccine Phòng Bệnh Tai Xanh | Vinatetco',
      image: metaImage,
      description: 'Vaccine phòng bệnh tai xanh cho heo, đảm bảo hiệu quả bảo vệ cao và an toàn.',
    },
    _status: 'published',
    layout: [],
    categories: categories,
    description: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Vaccine phòng bệnh tai xanh cho heo, đảm bảo hiệu quả bảo vệ cao và an toàn.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    gallery: [{ image: galleryImage }],
    title: 'Vaccine Phòng Bệnh Tai Xanh',
    slug: 'vaccine-phong-benh-tai-xanh',
    priceInUSDEnabled: true,
    priceInUSD: 45.50,
    animalType: 'pig',
    formulation: 'injection',
    productType: 'vaccine',
    featured: true,
    relatedProducts: relatedProducts,
  }
}

export const productSupplementData: (args: ProductArgs) => RequiredDataFromCollectionSlug<'products'> = ({
  galleryImage,
  relatedProducts,
  metaImage,
  categories,
}) => {
  return {
    meta: {
      title: 'Bổ Sung Vitamin Cho Gia Cầm | Vinatetco',
      image: metaImage,
      description: 'Bổ sung vitamin tổng hợp cho gia cầm, hỗ trợ tăng trưởng và sức khỏe.',
    },
    _status: 'published',
    layout: [],
    categories: categories,
    description: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Bổ sung vitamin tổng hợp cho gia cầm, hỗ trợ tăng trưởng và sức khỏe.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    gallery: [{ image: galleryImage }],
    title: 'Bổ Sung Vitamin Cho Gia Cầm',
    slug: 'bo-sung-vitamin-cho-gia-cam',
    priceInUSDEnabled: true,
    priceInUSD: 18.75,
    animalType: 'poultry',
    formulation: 'powder',
    productType: 'supplement',
    featured: false,
    relatedProducts: relatedProducts,
  }
}

export const productParasiticData: (args: ProductArgs) => RequiredDataFromCollectionSlug<'products'> = ({
  galleryImage,
  relatedProducts,
  metaImage,
  categories,
}) => {
  return {
    meta: {
      title: 'Thuốc Trừ Ký Sinh Trùng Cho Bò | Vinatetco',
      image: metaImage,
      description: 'Thuốc trừ ký sinh trùng hiệu quả cho bò, loại bỏ các loại ký sinh trùng gây hại.',
    },
    _status: 'published',
    layout: [],
    categories: categories,
    description: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Thuốc trừ ký sinh trùng hiệu quả cho bò, loại bỏ các loại ký sinh trùng gây hại.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    gallery: [{ image: galleryImage }],
    title: 'Thuốc Trừ Ký Sinh Trùng Cho Bò',
    slug: 'thuoc-tru-ky-sinh-trung-cho-bo',
    priceInUSDEnabled: true,
    priceInUSD: 32.00,
    animalType: 'cattle',
    formulation: 'injection',
    productType: 'parasitic',
    featured: true,
    relatedProducts: relatedProducts,
  }
}

export const productAquacultureData: (args: ProductArgs) => RequiredDataFromCollectionSlug<'products'> = ({
  galleryImage,
  relatedProducts,
  metaImage,
  categories,
}) => {
  return {
    meta: {
      title: 'Thuốc Kháng Sinh Cho Tôm | Vinatetco',
      image: metaImage,
      description: 'Thuốc kháng sinh chuyên dụng cho nuôi trồng thủy sản, đảm bảo chất lượng nước và sức khỏe tôm.',
    },
    _status: 'published',
    layout: [],
    categories: categories,
    description: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Thuốc kháng sinh chuyên dụng cho nuôi trồng thủy sản, đảm bảo chất lượng nước và sức khỏe tôm.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    gallery: [{ image: galleryImage }],
    title: 'Thuốc Kháng Sinh Cho Tôm',
    slug: 'thuoc-khang-sinh-cho-tom',
    priceInUSDEnabled: true,
    priceInUSD: 28.50,
    animalType: 'aquaculture',
    formulation: 'solution',
    productType: 'medication',
    featured: false,
    relatedProducts: relatedProducts,
  }
}

export const productPetData: (args: ProductArgs) => RequiredDataFromCollectionSlug<'products'> = ({
  galleryImage,
  relatedProducts,
  metaImage,
  categories,
}) => {
  return {
    meta: {
      title: 'Thuốc Diệt Ký Sinh Trùng Cho Chó Mèo | Vinatetco',
      image: metaImage,
      description: 'Thuốc diệt ký sinh trùng an toàn cho chó và mèo, loại bỏ ve, bọ chét và giun.',
    },
    _status: 'published',
    layout: [],
    categories: categories,
    description: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Thuốc diệt ký sinh trùng an toàn cho chó và mèo, loại bỏ ve, bọ chét và giun.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    gallery: [{ image: galleryImage }],
    title: 'Thuốc Diệt Ký Sinh Trùng Cho Chó Mèo',
    slug: 'thuoc-diet-ky-sinh-trung-cho-cho-meo',
    priceInUSDEnabled: true,
    priceInUSD: 15.99,
    animalType: 'pets',
    formulation: 'tablets',
    productType: 'parasitic',
    featured: true,
    relatedProducts: relatedProducts,
  }
}
