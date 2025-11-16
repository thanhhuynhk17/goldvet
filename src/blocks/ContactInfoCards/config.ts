import { Block } from 'payload'

export const ContactInfoCards: Block = {
  slug: 'contactInfoCards',
  interfaceName: 'ContactInfoCardsBlock',
  fields: [
    {
      name: 'cards',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Phone', value: 'phone' },
            { label: 'Email', value: 'email' },
            { label: 'Location', value: 'location' },
            { label: 'Clock', value: 'clock' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Facebook', value: 'facebook' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          admin: {
            description: 'Optional link (e.g., tel:, mailto:, https://)',
          },
        },
        {
          name: 'isPrimary',
          type: 'checkbox',
          label: 'Primary contact method',
          defaultValue: false,
        },
      ],
    },
  ],
  labels: {
    singular: 'Contact Info Cards',
    plural: 'Contact Info Cards',
  },
}
