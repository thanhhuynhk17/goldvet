import { RequiredDataFromCollectionSlug } from 'payload'

export const cuaHangData: () => RequiredDataFromCollectionSlug<'pages'> = () => {
  return {
    slug: 'cua-hang',
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
                  text: 'Giới thiệu - Goldvet',
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
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Hơn 50 năm tiên phong trong lĩnh vực dược phẩm thú y, mang đến những giải pháp chăm sóc sức khỏe động vật toàn diện',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
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
        blockType: 'productSection',
        blockName: 'Store Products',
        title: 'Sản Phẩm Thú Y',
        displayCount: 8,
      },
    ],
    meta: {
      description: 'Mua thuốc thú y chính hãng, vaccine và các sản phẩm chăm sóc sức khỏe động vật từ Goldvet Việt Nam.',
      title: 'Cửa Hàng - Goldvet',
    },
    title: 'Cửa Hàng',
  }
}
