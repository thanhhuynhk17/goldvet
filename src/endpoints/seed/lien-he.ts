import type { Form } from '@/payload-types'

import { RequiredDataFromCollectionSlug } from 'payload'

type LienHeArgs = {
  contactForm: Form
  contactBanner?: any
}

export const lienHeData: (args: LienHeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  contactForm,
  contactBanner,
}) => {
  return {
    slug: 'lien-he',
    _status: 'published',
    hero: {
      type: 'lowImpact',
      richText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              children: [{ type: 'text', text: 'Liên Hệ Với Goldvet', version: 1 }],
              direction: 'ltr',
              format: '',
              indent: 0,
              tag: 'h1',
              version: 1,
            },
            {
              type: 'paragraph',
              children: [{
                type: 'text',
                text: 'Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn. Hãy liên hệ ngay để được phục vụ tốt nhất.',
                version: 1
              }],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    layout: [
      {
        blockType: 'contactForm',
        blockName: 'Contact Form',
        title: 'Liên hệ với chúng tôi',
        subtitle: 'Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn',
        form: contactForm,
        backgroundColor: 'white',
      } as any,
      {
        blockType: 'businessRegistration',
        blockName: 'Business Registration',
        title: 'Thông tin doanh nghiệp',
        taxCode: '0900227476',
        issueDate: '05/05/2004',
        issuedBy: 'Sở Kế hoạch và Đầu tư tỉnh Hưng Yên',
        backgroundColor: 'gray',
      } as any,
      {
        blockType: 'certifications',
        blockName: 'Certifications',
        title: 'Chứng nhận & Chứng chỉ',
        certificationItems: [
          {
            name: 'GMP',
            description: 'Thực hành sản xuất tốt',
          },
          {
            name: 'ISO 9001',
            description: 'Hệ thống quản lý chất lượng',
          },
        ],
        backgroundColor: 'white',
      } as any,
      {
        blockType: 'quickContact',
        blockName: 'Quick Contact',
        title: 'Liên hệ nhanh',
        contacts: [
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
        backgroundColor: 'gray',
      } as any,
    ],
    meta: {
      description: 'Liên hệ với Goldvet - Chuyên cung cấp các sản phẩm thú y chính hãng, chất lượng. Địa chỉ: Hà Nội. Hotline: 0866 399 380',
      title: 'Liên Hệ - Goldvet',
    },
    title: 'Liên Hệ - Goldvet',
  }
};
