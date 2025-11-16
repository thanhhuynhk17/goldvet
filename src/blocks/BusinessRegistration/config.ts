import type { Block } from 'payload'

export const BusinessRegistration: Block = {
  slug: 'businessRegistration',
  interfaceName: 'BusinessRegistrationType',
  labels: {
    singular: 'Business Registration',
    plural: 'Business Registrations',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Thông tin doanh nghiệp',
      required: true,
    },
    {
      name: 'taxCode',
      type: 'text',
      label: 'Mã số thuế',
      defaultValue: '0900227476',
      required: true,
    },
    {
      name: 'issueDate',
      type: 'text',
      label: 'Ngày cấp',
      defaultValue: '05/05/2004',
      required: true,
    },
    {
      name: 'issuedBy',
      type: 'text',
      label: 'Nơi cấp',
      defaultValue: 'Sở Kế hoạch và Đầu tư tỉnh Hưng Yên',
      required: true,
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
