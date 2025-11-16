import type { Block } from 'payload'

export const Certifications: Block = {
  slug: 'certifications',
  interfaceName: 'CertificationsType',
  labels: {
    singular: 'Certifications',
    plural: 'Certifications Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Chứng nhận & Chứng chỉ',
      required: true,
    },
    {
      name: 'certificationItems',
      type: 'array',
      label: 'Certification Items',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Certification Name',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Certification Image',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
      ],
      defaultValue: [
        {
          name: 'GMP',
          description: 'Thực hành sản xuất tốt',
        },
        {
          name: 'ISO 9001',
          description: 'Hệ thống quản lý chất lượng',
        },
      ],
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
