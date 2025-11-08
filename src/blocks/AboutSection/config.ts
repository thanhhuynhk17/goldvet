import { Block } from 'payload'

export const AboutSection: Block = {
  slug: 'aboutSection',
  interfaceName: 'AboutSectionBlock',
  labels: {
    singular: 'About Section',
    plural: 'About Sections',
  },
  fields: [
    {
      name: 'titleLine1',
      type: 'text',
      label: 'Title Line 1',
      defaultValue: 'Tự hào hơn 50 năm',
      required: true,
      admin: {
        description: 'First line of the main title (red color)',
      },
    },
    {
      name: 'titleLine2',
      type: 'text',
      label: 'Title Line 2',
      defaultValue: 'Hành trình Vì sức khỏe cộng đồng',
      required: true,
      admin: {
        description: 'Second line of the main title (green color)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: false,
      admin: {
        description: 'Description text to display below the title',
      },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      label: 'Video',
      required: false,
      admin: {
        description: 'Video file to display in the video section',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: false,
      admin: {
        description: 'Background image overlay (world map recommended)',
      },
    },
  ],
}
