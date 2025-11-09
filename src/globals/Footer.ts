import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    // Company Information Section
    {
      name: 'companyInfo',
      type: 'group',
      label: 'Thông Tin Công Ty',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Tên Công Ty',
          defaultValue: 'Goldvet',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Mô Tả Công Ty',
          defaultValue: 'Chuyên cung cấp các giải pháp chăm sóc sức khỏe động vật toàn diện cho ngành chăn nuôi Việt Nam.',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo Công Ty',
        },
      ],
    },
    // Contact Information Section
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Thông Tin Liên Hệ',
      fields: [
        {
          name: 'address',
          type: 'textarea',
          label: 'Địa Chỉ',
          defaultValue: '123 Đường ABC, Quận XYZ, TP.HCM, Việt Nam',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Số Điện Thoại',
          defaultValue: '(028) 1234 5678',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          defaultValue: 'info@goldvet.vn',
        },
        {
          name: 'businessHours',
          type: 'textarea',
          label: 'Giờ Làm Việc',
          defaultValue: 'Thứ 2 - Thứ 6: 8:00 - 17:00\nThứ 7: 8:00 - 12:00\nChủ Nhật: Nghỉ',
        },
      ],
    },
    // Navigation Links
    {
      name: 'navItems',
      type: 'array',
      label: 'Liên Kết Điều Hướng',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 8,
    },
    // Social Media Links
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Mạng Xã Hội',
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Nền Tảng',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Twitter', value: 'twitter' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Nhãn',
          defaultValue: 'Theo dõi chúng tôi',
        },
      ],
      maxRows: 5,
    },
    // Certifications/Badges
    {
      name: 'certifications',
      type: 'array',
      label: 'Chứng Nhận',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Tên Chứng Nhận',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo Chứng Nhận',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Liên Kết (tùy chọn)',
        },
      ],
      maxRows: 6,
    },
    // Footer Settings
    {
      name: 'footerSettings',
      type: 'group',
      label: 'Cài Đặt Footer',
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          label: 'Văn Bản Bản Quyền',
          defaultValue: '© 2025 Goldvet. Tất cả quyền được bảo lưu.',
        },
        {
          name: 'showBackToTop',
          type: 'checkbox',
          label: 'Hiển Thị Nút Quay Lên Đầu Trang',
          defaultValue: true,
        },
      ],
    },
  ],
}
