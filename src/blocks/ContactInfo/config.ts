import type { Block } from 'payload'

export const ContactInfo: Block = {
  slug: 'contactInfo',
  interfaceName: 'ContactInfoType',
  labels: {
    singular: 'Contact Information',
    plural: 'Contact Information Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Thông tin liên hệ',
      required: true,
    },
    {
      name: 'companyName',
      type: 'text',
      label: 'Company Name',
      defaultValue: 'CÔNG TY TNHH NÔNG NGHIỆP TẬP ĐOÀN GOLDVET',
      required: true,
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Address',
      defaultValue: 'Số 10, ngõ 90 Nam Dư, Phường Lĩnh Nam, Quận Hoàng Mai, Hà Nội',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
      defaultValue: '0866 399 380',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      defaultValue: 'info@goldvet.vn',
      required: true,
    },
    {
      name: 'businessHours',
      type: 'textarea',
      label: 'Business Hours',
      defaultValue: 'Thứ 2 - Thứ 6: 8:00 - 17:00\nThứ 7: 8:00 - 12:00\nChủ Nhật: Nghỉ',
      required: true,
    },
    {
      name: 'showMap',
      type: 'checkbox',
      label: 'Show Map',
      defaultValue: false,
    },
    {
      name: 'mapEmbed',
      type: 'textarea',
      label: 'Map Embed Code',
      admin: {
        condition: (_, siblingData) => siblingData?.showMap,
      },
    },
  ],
}
