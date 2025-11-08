import type { Block } from 'payload'

export const Achievements: Block = {
  slug: 'achievements',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Thành tựu Vinatetco đã đạt được',
    },
    {
      name: 'mainNumber',
      type: 'text',
      required: true,
      defaultValue: '50+',
    },
    {
      name: 'mainNumberLabel',
      type: 'text',
      required: true,
      defaultValue: 'Năm',
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
      defaultValue: 'Vì sức khỏe cộng đồng',
    },
    {
      name: 'achievements',
      type: 'array',
      minRows: 4,
      maxRows: 4,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Shield (Bảo vệ)', value: 'shield' },
            { label: 'Factory (Nhà máy)', value: 'factory' },
            { label: 'Box (Sản phẩm)', value: 'box' },
            { label: 'Network (Mạng lưới)', value: 'network' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  interfaceName: 'AchievementsBlock',
}
