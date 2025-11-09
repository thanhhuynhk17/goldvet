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
          },
          {
            title: 'Sản Phẩm Chất Lượng Cao',
            subtitle: 'Đạt tiêu chuẩn GMP-WHO, đảm bảo an toàn cho vật nuôi',
            link: {
              label: 'Xem sản phẩm',
              url: '/san-pham'
            }
          },
          {
            title: 'Hệ Thống Phân Phối Toàn Quốc',
            subtitle: '63 tỉnh thành và các quốc gia trong khu vực',
            link: {
              label: 'Liên hệ ngay',
              url: '/lien-he'
            }
          },
          {
            title: 'Đồng Hành Cùng Nông Dân Việt Nam',
            subtitle: 'Hỗ trợ kỹ thuật và tư vấn chuyên môn',
            link: {
              label: 'Tư vấn miễn phí',
              url: '/tu-van'
            }
          }
        ]
      },
      {
        blockType: 'aboutSection',
        blockName: 'Company Story',
        titleLine1: 'Tự hào hơn 50 năm',
        titleLine2: 'Hành trình Vì sức khỏe cộng đồng',
        description: 'Công ty Cổ phần Thuốc Thú y TW1 (VINAVETCO) là doanh nghiệp dược thú y lâu đời nhất Việt Nam với hơn 50 năm kinh nghiệm trong ngành. Chúng tôi cam kết cung cấp các sản phẩm chất lượng cao, đạt tiêu chuẩn quốc tế GMP-WHO, góp phần bảo vệ sức khỏe vật nuôi và phát triển ngành chăn nuôi bền vững.'
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
        blockType: 'statistics',
        blockName: 'Company Statistics',
        stats: [
          {
            number: '50+',
            label: 'Năm',
            description: 'Kinh nghiệm ngành'
          },
          {
            number: '600+',
            label: 'Sản phẩm',
            description: 'Dược thú y'
          },
          {
            number: '63',
            label: 'Tỉnh thành',
            description: 'Phân phối'
          },
          {
            number: '1M+',
            label: 'Khách hàng',
            description: 'Tin tưởng'
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
