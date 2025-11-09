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
            title: 'Thuốc Thú Y Goldvet - Chuyên Gia Về Sức Khỏe Động Vật',
            subtitle: 'Cung cấp các sản phẩm thú y chính hãng, chất lượng cao cho ngành chăn nuôi',
            link: {
              label: 'Khám phá sản phẩm',
              url: '/cua-hang'
            }
          },
          {
            title: 'SIÊU MỌC LÔNG - Sản Phẩm Đỉnh Cao',
            subtitle: 'Giải pháp dinh dưỡng chuyên biệt cho vật nuôi',
            link: {
              label: 'Xem sản phẩm',
              url: '/cua-hang'
            }
          },
          {
            title: 'Phân Phối Toàn Quốc',
            subtitle: 'Miễn phí vận chuyển, hỗ trợ 24/7, giao hàng đúng giờ',
            link: {
              label: 'Liên hệ ngay',
              url: '/lien-he'
            }
          },
          {
            title: 'Goldvet - Trao Giá Trị Thật',
            subtitle: 'Đồng hành cùng nhà chăn nuôi Việt Nam',
            link: {
              label: 'Tư vấn miễn phí',
              url: '/lien-he'
            }
          }
        ]
      },
      {
        blockType: 'aboutSection',
        blockName: 'Company Story',
        titleLine1: 'Goldvet',
        titleLine2: 'Trao giá trị thật cho ngành chăn nuôi',
        description: 'CÔNG TY TNHH NÔNG NGHIỆP TẬP ĐOÀN GOLDVET chuyên cung cấp các sản phẩm thú y chính hãng, chất lượng cao đến tận tay nhà chăn nuôi. Chúng tôi cam kết mang đến giải pháp chăm sóc sức khỏe động vật toàn diện, góp phần phát triển ngành chăn nuôi bền vững tại Việt Nam.'
      },
      {
        blockType: 'achievements',
        blockName: 'Achievements Section',
        title: 'Thành tựu Goldvet đã đạt được',
        mainNumber: '10+',
        mainNumberLabel: 'Năm',
        tagline: 'Trao giá trị thật',
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
            number: '10+',
            label: 'Năm',
            description: 'Phục vụ ngành chăn nuôi'
          },
          {
            number: '50+',
            label: 'Sản phẩm',
            description: 'Thuốc thú y chất lượng'
          },
          {
            number: '63',
            label: 'Tỉnh thành',
            description: 'Phân phối toàn quốc'
          },
          {
            number: '10K+',
            label: 'Khách hàng',
            description: 'Tin tưởng lựa chọn'
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
      description: 'Thuốc Thú Y Goldvet - Chuyên cung cấp các sản phẩm thú y chính hãng, chất lượng cao cho ngành chăn nuôi Việt Nam.',
      title: 'Thuốc Thú Y Goldvet - Trao Giá Trị Thật',
    },
    title: 'Trang Chủ',
  }
}
