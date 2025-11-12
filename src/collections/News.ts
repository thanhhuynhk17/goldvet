import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { NewsArticleConfig } from '@/blocks/NewsArticle'

export const News: CollectionConfig = {
  slug: 'news',
  access: {
    read: () => true, // Allow public read access for published news
  },
  admin: {
    defaultColumns: ['title', 'category', '_status', 'publishedDate'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'news',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'news',
        req,
      }),
    useAsTitle: 'title',
  },
  defaultPopulate: {
    title: true,
    slug: true,
    excerpt: true,
    featuredImage: true,
    category: true,
    publishedDate: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedOn',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      maxLength: 300,
      admin: {
        description: 'Short description for previews (max 300 characters)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
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
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'select',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Tin Vinatetco', value: 'company' },
        { label: 'Tin ngành', value: 'industry' }
      ],
      required: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
      defaultValue: () => new Date().toISOString(),
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
    // Hero section for block-based layout
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Hero Type',
          options: [
            { label: 'Low Impact', value: 'lowImpact' },
            { label: 'High Impact', value: 'highImpact' },
            { label: 'Medium Impact', value: 'mediumImpact' },
            { label: 'None', value: 'none' },
          ],
          defaultValue: 'lowImpact',
        },
        {
          name: 'richText',
          type: 'richText',
          label: 'Hero Content',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h1', 'h2'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
          admin: {
            condition: (data) => data?.hero?.type !== 'none',
          },
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Background Image',
          admin: {
            condition: (data) => data?.hero?.type !== 'none',
          },
        },
      ],
    },
    // Layout blocks for flexible content management
    {
      name: 'layout',
      type: 'blocks',
      label: 'Article Layout',
      blocks: [
        NewsArticleConfig,
      ],
      defaultValue: [
        {
          blockType: 'newsArticle',
          showCategory: true,
          showDate: true,
          showExcerpt: true,
          showFeaturedImage: true,
          backToNewsText: '← Quay lại bài viết',
          backToNewsUrl: '/bai-viet',
        },
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 50,
  },
}
