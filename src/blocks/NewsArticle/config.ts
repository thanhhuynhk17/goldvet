import type { Block } from 'payload'

export const NewsArticle: Block = {
  slug: 'newsArticle',
  fields: [
    {
      name: 'showCategory',
      type: 'checkbox',
      label: 'Show Category Badge',
      defaultValue: true,
      admin: {
        description: 'Display the news category (company/industry) as a badge',
      },
    },
    {
      name: 'showDate',
      type: 'checkbox',
      label: 'Show Publication Date',
      defaultValue: true,
      admin: {
        description: 'Display the article publication date',
      },
    },
    {
      name: 'showExcerpt',
      type: 'checkbox',
      label: 'Show Excerpt in Hero',
      defaultValue: true,
      admin: {
        description: 'Display the article excerpt in the hero section',
      },
    },
    {
      name: 'showFeaturedImage',
      type: 'checkbox',
      label: 'Show Featured Image',
      defaultValue: true,
      admin: {
        description: 'Display the featured image above the article content',
      },
    },
    {
      name: 'backToNewsText',
      type: 'text',
      label: 'Back to News Link Text',
      defaultValue: '← Quay lại bài viết',
      admin: {
        description: 'Text for the back to news listing link',
      },
    },
    {
      name: 'backToNewsUrl',
      type: 'text',
      label: 'Back to News URL',
      defaultValue: '/bai-viet',
      admin: {
        description: 'URL for the back to news listing link',
      },
    },
  ],
  labels: {
    singular: 'News Article',
    plural: 'News Articles',
  },
}
