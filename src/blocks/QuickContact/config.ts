import type { Block } from 'payload'

export const QuickContact: Block = {
  slug: 'quickContact',
  interfaceName: 'QuickContactType',
  labels: {
    singular: 'Quick Contact',
    plural: 'Quick Contact Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Liên hệ nhanh',
      required: true,
    },
    {
      name: 'contacts',
      type: 'array',
      label: 'Quick Contact Options',
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Platform',
          options: [
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Zalo', value: 'zalo' },
            { label: 'Phone', value: 'phone' },
            { label: 'Facebook', value: 'facebook' },
          ],
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Display Label',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          label: 'Contact Value',
          required: true,
        },
      ],
      defaultValue: [
        {
          platform: 'whatsapp',
          label: 'WhatsApp',
          value: '+840866399380',
        },
        {
          platform: 'zalo',
          label: 'Zalo',
          value: '0866399380',
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      defaultValue: 'gray',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Gray', value: 'gray' },
      ],
    },
  ],
}
