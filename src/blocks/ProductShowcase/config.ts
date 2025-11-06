import type { Block } from 'payload'

export const ProductShowcase: Block = {
  slug: 'productShowcase',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Sản phẩm nổi bật',
      label: 'Tiêu đề',
    },
    {
      name: 'displayCount',
      type: 'number',
      defaultValue: 8,
      min: 1,
      max: 20,
      label: 'Số lượng sản phẩm hiển thị',
    },
    {
      name: 'filterBy',
      type: 'select',
      defaultValue: 'featured',
      options: [
        { label: 'Sản phẩm nổi bật', value: 'featured' },
        { label: 'Sản phẩm mới nhất', value: 'latest' },
        { label: 'Ngẫu nhiên', value: 'random' }
      ],
      label: 'Lọc theo',
    },
  ],
  interfaceName: 'ProductShowcaseBlock',
}
