import type { Form } from '@/payload-types'

import { RequiredDataFromCollectionSlug } from 'payload'

type ProductArgs = {
  contactForm: Form
}

export const lienHeData: (args: ProductArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  contactForm,
}) => {
  return {
    slug: 'lien-he',
    _status: 'published',
    hero: {
      type: 'none',
    },
    layout: [
      {
        blockType: 'formBlock',
        enableIntro: true,
        form: contactForm,
        introContent: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Example contact form:',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h3',
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
    ],
    title: 'Liên Hệ - Goldvet',
  }
}
