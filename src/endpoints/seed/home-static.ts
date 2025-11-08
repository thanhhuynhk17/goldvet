import { RequiredDataFromCollectionSlug } from 'payload'

export const homeStaticData: () => RequiredDataFromCollectionSlug<'pages'> = () => {
  return {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'lowImpact',
      richText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Payload Ecommerce Template',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              tag: 'h1',
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'link',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Visit the admin dashboard',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  fields: {
                    linkType: 'custom',
                    newTab: false,
                    url: '/admin',
                  },
                  format: '',
                  indent: 0,
                  version: 2,
                },
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: ' to make your account and seed content for your website.',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    layout: [
      {
        blockType: 'heroCarousel',
        blockName: 'Hero Carousel',
        slides: [
          {
            title: 'Thương Hiệu Dược Thú Y Lâu Đời Nhất Việt Nam',
            subtitle: 'Hơn 50 năm kinh nghiệm trong ngành dược thú y Việt Nam',
            link: {
              label: 'Khám phá sản phẩm',
              url: '/san-pham'
            }
          }
        ]
      },
      {
        blockType: 'achievements',
        blockName: 'Achievements Section',
        title: 'Thành tựu Vinatetco đã đạt được',
        mainNumber: '50+',
        mainNumberLabel: 'Năm',
        tagline: 'Vì sức khỏe cộng đồng',
        achievements: [
          {
            icon: 'network',
            title: 'Hệ thống phân phối',
            description: 'Tại 63 tỉnh thành và một số quốc gia khác'
          },
          {
            icon: 'factory',
            title: 'Tiêu chuẩn hiện đại',
            description: 'Đạt chuẩn GMP-WHO quốc tế'
          },
          {
            icon: 'box',
            title: '600+ sản phẩm',
            description: 'Đa dạng chủng loại dược thú y'
          },
          {
            icon: 'shield',
            title: '1.000.000+ khách hàng',
            description: 'Tin tưởng sử dụng sản phẩm'
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
    ],
    meta: {
      description: 'An open-source ecommerce site built with Payload and Next.js.',
      title: 'Payload Ecommerce Template',
    },
    title: 'Home',
  }
}
