import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { slugField } from 'payload'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { CollectionOverride } from '@payloadcms/plugin-ecommerce/types'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { DefaultDocumentIDType, Where } from 'payload'

export const ProductsCollection: CollectionOverride = ({ defaultCollection }) => ({
  ...defaultCollection,
  admin: {
    ...defaultCollection?.admin,
    defaultColumns: ['title', 'enableVariants', '_status', 'variants.variants'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'products',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'products',
        req,
      }),
    useAsTitle: 'title',
  },
  defaultPopulate: {
    ...defaultCollection?.defaultPopulate,
    title: true,
    slug: true,
    variantOptions: true,
    variants: true,
    enableVariants: true,
    gallery: true,
    priceInUSD: true,
    inventory: true,
    meta: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'description',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: false,
            },
            {
              name: 'gallery',
              type: 'array',
              minRows: 1,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'variantOption',
                  type: 'relationship',
                  relationTo: 'variantOptions',
                  admin: {
                    condition: (data) => {
                      return data?.enableVariants === true && data?.variantTypes?.length > 0
                    },
                  },
                  filterOptions: ({ data }) => {
                    if (data?.enableVariants && data?.variantTypes?.length) {
                      const variantTypeIDs = data.variantTypes.map((item: any) => {
                        if (typeof item === 'object' && item?.id) {
                          return item.id
                        }
                        return item
                      }) as DefaultDocumentIDType[]

                      if (variantTypeIDs.length === 0)
                        return {
                          variantType: {
                            in: [],
                          },
                        }

                      const query: Where = {
                        variantType: {
                          in: variantTypeIDs,
                        },
                      }

                      return query
                    }

                    return {
                      variantType: {
                        in: [],
                      },
                    }
                  },
                },
              ],
            },

            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock],
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            ...defaultCollection.fields,
            {
              name: 'relatedProducts',
              type: 'relationship',
              filterOptions: ({ id }) => {
                if (id) {
                  return {
                    id: {
                      not_in: [id],
                    },
                  }
                }

                // ID comes back as undefined during seeding so we need to handle that case
                return {
                  id: {
                    exists: true,
                  },
                }
              },
              hasMany: true,
              relationTo: 'products',
            },
          ],
          label: 'Product Details',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        position: 'sidebar',
        sortOptions: 'title',
      },
      hasMany: true,
      relationTo: 'categories',
    },
    // Vinavetco veterinary product fields
    {
      name: 'animalType',
      type: 'select',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Heo (Pig)', value: 'pig' },
        { label: 'Gia cầm (Poultry)', value: 'poultry' },
        { label: 'Trâu bò (Cattle)', value: 'cattle' },
        { label: 'Tôm cá (Aquaculture)', value: 'aquaculture' },
        { label: 'Thú cưng (Pets)', value: 'pets' }
      ],
      required: true,
    },
    {
      name: 'formulation',
      type: 'select',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Dạng tiêm (Injection)', value: 'injection' },
        { label: 'Dạng dung dịch (Solution)', value: 'solution' },
        { label: 'Dạng bột (Powder)', value: 'powder' },
        { label: 'Dạng viên (Tablets)', value: 'tablets' },
        { label: 'Dạng dùng ngoài (External)', value: 'external' }
      ],
      required: true,
    },
    {
      name: 'productType',
      type: 'select',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Vaccine', value: 'vaccine' },
        { label: 'Thuốc thú y (Medication)', value: 'medication' },
        { label: 'Hỗ trợ điều trị (Supplement)', value: 'supplement' },
        { label: 'Ký sinh trùng (Parasitic)', value: 'parasitic' },
        { label: 'Bổ trợ (Support)', value: 'support' }
      ],
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
      },
      defaultValue: false,
      label: 'Nổi bật (Featured)',
    },
    // Veterinary product specification fields
    {
      name: 'activeIngredient',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      label: 'Chất hoạt động (Active Ingredient)',
    },
    {
      name: 'concentration',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      label: 'Hàm lượng (Concentration)',
    },
    {
      name: 'pharmaceuticalForm',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      label: 'Dạng bào chế (Pharmaceutical Form)',
    },
    {
      name: 'appearance',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      label: 'Hình trạng (Appearance)',
    },
    {
      name: 'packing',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      label: 'Đóng gói (Packing)',
    },
    {
      name: 'storageConditions',
      type: 'textarea',
      admin: {
        position: 'sidebar',
      },
      label: 'Điều kiện bảo quản (Storage Conditions)',
    },
    {
      name: 'shelfLife',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      label: 'Hạn sử dụng (Shelf Life)',
    },
    {
      name: 'indications',
      type: 'array',
      admin: {
        position: 'sidebar',
      },
      label: 'Chỉ định (Indications)',
      fields: [
        {
          name: 'indication',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'dosage',
      type: 'array',
      admin: {
        position: 'sidebar',
      },
      label: 'Liều lượng (Dosage)',
      fields: [
        {
          name: 'species',
          type: 'text',
          required: true,
          label: 'Loài động vật (Species)',
        },
        {
          name: 'dose',
          type: 'text',
          required: true,
          label: 'Liều lượng (Dose)',
        },
        {
          name: 'duration',
          type: 'text',
          required: true,
          label: 'Thời gian (Duration)',
        },
        {
          name: 'notes',
          type: 'text',
          label: 'Ghi chú (Notes)',
        },
      ],
    },
    {
      name: 'contraindications',
      type: 'array',
      admin: {
        position: 'sidebar',
      },
      label: 'Chống chỉ định (Contraindications)',
      fields: [
        {
          name: 'contraindication',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'sideEffects',
      type: 'array',
      admin: {
        position: 'sidebar',
      },
      label: 'Tác dụng phụ (Side Effects)',
      fields: [
        {
          name: 'effect',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'ingredients',
      type: 'array',
      admin: {
        position: 'sidebar',
      },
      label: 'Thành phần (Ingredients)',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Tên thành phần (Name)',
        },
        {
          name: 'percentage',
          type: 'text',
          required: true,
          label: 'Hàm lượng (Percentage)',
        },
      ],
    },
    {
      name: 'certificate',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      label: 'Chứng nhận (Certificate)',
    },
    {
      name: 'registration',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      label: 'Đăng ký (Registration)',
    },
    slugField(),
  ],
})
