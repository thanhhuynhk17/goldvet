import { Block } from 'payload'

export const ProductDetail: Block = {
  slug: 'productDetail',
  interfaceName: 'ProductDetailBlock',
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      admin: {
        description: 'Select the product to display detailed information for',
      },
    },
  ],
  labels: {
    singular: 'Product Detail',
    plural: 'Product Details',
  },
}
