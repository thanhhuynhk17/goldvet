import type { Block } from 'payload'

export const Statistics: Block = {
  slug: 'statistics',
  fields: [
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          label: 'Number (e.g., "50+", "25 năm")',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label (e.g., "Năm", "Sản phẩm")',
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          label: 'Description',
        },
      ],
    },
  ],
  interfaceName: 'StatisticsBlock',
}
