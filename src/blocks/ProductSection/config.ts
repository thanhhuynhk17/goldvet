import type { Block } from 'payload'

export const ProductSection: Block = {
  slug: 'productSection',
  interfaceName: 'ProductSectionBlock',
  labels: {
    singular: 'Product Section',
    plural: 'Product Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tiêu đề',
      defaultValue: 'Sản phẩm',
      required: true,
      admin: {
        description: 'Tiêu đề hiển thị của section sản phẩm',
      },
    },
    {
      name: 'displayCount',
      type: 'number',
      label: 'Số lượng sản phẩm hiển thị',
      defaultValue: 8,
      min: 1,
      max: 20,
      required: true,
      admin: {
        description: 'Số lượng sản phẩm hiển thị ban đầu',
      },
    },
  ],
}
