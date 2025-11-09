import { RequiredDataFromCollectionSlug } from 'payload'

export const baiVietData: (media?: any) => RequiredDataFromCollectionSlug<'pages'> = (media) => {
  return {
    slug: 'bai-viet',
    _status: 'published',
    hero: {
      type: 'lowImpact',
      ...(media && { media }),
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
                  text: 'Bài Viết & Tin Tức',
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
                  text: 'Cập nhật những bài viết và tin tức mới nhất từ GoldVet và ngành dược thú y Việt Nam',
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
        blockType: 'newsGrid',
        blockName: 'News Articles',
        title: 'Bài Viết & Tin Tức',
        category: 'all',
        displayCount: 6,
      },
    ],
    meta: {
      description: 'Đọc các bài viết, tin tức và kiến thức chuyên môn về thú y, chăn nuôi từ Goldvet Việt Nam.',
      title: 'Bài Viết - Goldvet',
    },
    title: 'Bài Viết',
  }
}
