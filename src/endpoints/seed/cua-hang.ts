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
                  text: 'Sản phẩm',
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
                  text: 'Giải pháp dược phẩm thú y toàn diện',
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
        blockType: 'storeLayout',
        blockName: 'Store Layout',
        title: 'Sản phẩm',
        subtitle: 'Giải pháp dược phẩm thú y toàn diện',
        displayFilters: true,
        enableSearch: true,
        showRatings: true,
        itemsPerPage: 12,
        sortBy: 'createdAt'
      },
    ],
    meta: {
      description: 'Mua thuốc thú y chính hãng, vaccine và các sản phẩm chăm sóc sức khỏe động vật từ Goldvet Việt Nam.',
      title: 'Cửa Hàng - Goldvet',
    },
    title: 'Cửa Hàng',
  }
}
