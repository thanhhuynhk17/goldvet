import type { Block } from 'payload'

export const NewsGrid: Block = {
  slug: 'newsGrid',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Tin tức & Sự kiện',
      label: 'Tiêu đề',
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'all',
      options: [
        { label: 'Tất cả', value: 'all' },
        { label: 'Tin Vinavetco', value: 'company' },
        { label: 'Tin ngành', value: 'industry' }
      ],
      label: 'Danh mục',
    },
    {
      name: 'displayCount',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 20,
      label: 'Số lượng bài viết hiển thị',
    },
  ],
  interfaceName: 'NewsGridBlock',
}
