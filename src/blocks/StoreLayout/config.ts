import { Block } from 'payload'

export const StoreLayout: Block = {
  slug: 'storeLayout',
  interfaceName: 'StoreLayoutBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Sản phẩm',
      label: 'Tiêu đề trang',
      admin: {
        description: 'Tiêu đề hiển thị ở đầu trang cửa hàng'
      }
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'Giải pháp dược phẩm thú y toàn diện',
      label: 'Phụ đề',
      admin: {
        description: 'Phụ đề hiển thị dưới tiêu đề'
      }
    },
    {
      name: 'displayFilters',
      type: 'checkbox',
      defaultValue: true,
      label: 'Hiển thị bộ lọc',
      admin: {
        description: 'Cho phép người dùng lọc sản phẩm theo danh mục'
      }
    },
    {
      name: 'enableSearch',
      type: 'checkbox',
      defaultValue: true,
      label: 'Bật tìm kiếm',
      admin: {
        description: 'Hiển thị ô tìm kiếm sản phẩm'
      }
    },
    {
      name: 'showRatings',
      type: 'checkbox',
      defaultValue: true,
      label: 'Hiển thị đánh giá',
      admin: {
        description: 'Hiển thị sao đánh giá trên thẻ sản phẩm'
      }
    },
    {
      name: 'itemsPerPage',
      type: 'number',
      defaultValue: 12,
      min: 6,
      max: 24,
      label: 'Số sản phẩm mỗi trang',
      admin: {
        description: 'Số lượng sản phẩm hiển thị trên mỗi trang'
      }
    },
    {
      name: 'sortBy',
      type: 'select',
      defaultValue: 'createdAt',
      options: [
        { label: 'Mới nhất', value: 'createdAt' },
        { label: 'Cũ nhất', value: '-createdAt' },
        { label: 'Tên A-Z', value: 'title' },
        { label: 'Tên Z-A', value: '-title' },
        { label: 'Giá thấp đến cao', value: 'priceInUSD' },
        { label: 'Giá cao đến thấp', value: '-priceInUSD' }
      ],
      label: 'Sắp xếp theo',
      admin: {
        description: 'Tiêu chí sắp xếp sản phẩm mặc định'
      }
    }
  ],
  labels: {
    singular: 'Bố cục Cửa hàng',
    plural: 'Bố cục Cửa hàng'
  }
}
