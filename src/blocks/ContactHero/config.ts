import type { Block } from 'payload'

export const ContactHero: Block = {
  slug: 'contactHero',
  interfaceName: 'ContactHeroType',
  labels: {
    singular: 'Contact Hero',
    plural: 'Contact Heroes',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Hero Title',
      defaultValue: 'Liên Hệ Với Goldvet',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Hero Subtitle',
      defaultValue: 'Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn. Hãy liên hệ ngay để được phục vụ tốt nhất.',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: false,
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      defaultValue: 'green',
      options: [
        { label: 'Green (Default)', value: 'green' },
        { label: 'Blue', value: 'blue' },
        { label: 'Gray', value: 'gray' },
      ],
    },
  ],
}
