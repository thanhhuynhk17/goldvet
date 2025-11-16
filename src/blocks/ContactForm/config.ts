import type { Block } from 'payload'

export const ContactForm: Block = {
  slug: 'contactForm',
  interfaceName: 'ContactFormType',
  labels: {
    singular: 'Contact Form',
    plural: 'Contact Forms',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Form Title',
      defaultValue: 'Liên hệ với chúng tôi',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Form Subtitle',
      defaultValue: 'Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn',
    },
    {
      name: 'form',
      type: 'relationship',
      label: 'Contact Form',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Gray', value: 'gray' },
      ],
    },
  ],
}
