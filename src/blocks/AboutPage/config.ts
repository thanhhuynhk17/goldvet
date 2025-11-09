import type { Block } from 'payload'

export const AboutPage: Block = {
  slug: 'aboutPage',
  interfaceName: 'AboutPageBlock',
  labels: {
    singular: 'About Page',
    plural: 'About Pages',
  },
  fields: [
    // Header Section
    {
      name: 'headerTitle',
      type: 'text',
      label: 'Header Title',
      defaultValue: 'Giới thiệu - Goldvet',
      required: true,
    },
    {
      name: 'headerBackgroundColor',
      type: 'select',
      label: 'Header Background Color',
      defaultValue: 'green',
      options: [
        { label: 'Green (Default)', value: 'green' },
        { label: 'Blue', value: 'blue' },
        { label: 'Dark', value: 'dark' },
      ],
    },

    // General Introduction Section
    {
      name: 'generalIntro',
      type: 'group',
      label: 'General Introduction',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          defaultValue: 'Giới thiệu chung',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          defaultValue: 'Công ty TNHH Nông Nghiệp Tập Đoàn GOLDVET là công ty chuyên sản xuất và kinh doanh thuốc thú y lâu đời nhất tại Việt Nam. Với bề dày kinh nghiệm trên 50 năm, GOLDVET luôn không ngừng đổi mới công nghệ, trang thiết bị sản xuất, cộng với đội ngũ cán bộ kỹ thuật được đào tạo chuyên môn sâu và các chuyên gia cố vấn là những giáo sư, phó giáo sư, tiến sĩ hàng đầu ngành thú y Việt Nam để cho ra thị trường những sản phẩm tốt nhất.',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Introduction Image',
          relationTo: 'media',
        },
      ],
    },

    // Business Areas Section
    {
      name: 'businessAreas',
      type: 'group',
      label: 'Business Areas',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          defaultValue: 'Lĩnh vực hoạt động',
          required: true,
        },
        {
          name: 'research',
          type: 'group',
          label: 'Research Area',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              defaultValue: 'Nghiên cứu',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              defaultValue: 'Tạo nên tên tuổi của GOLDVET từ lâu đời và thương hiệu luôn gắn liền với lĩnh vực nghiên cứu và phát triển với một đội ngũ nguồn nhân lực chất lượng cao là các Giáo sư, Phó giáo sư, tiến sĩ, dược sĩ, bác sĩ, kỹ sư đều có trình độ sau đại học được đào tạo chuyên sâu tại các trường đại học danh tiếng trong nước và quốc tế.',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              label: 'Image',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'production',
          type: 'group',
          label: 'Production Area',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              defaultValue: 'Sản xuất',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              defaultValue: 'GOLDVET đã đầu tư xây dựng Nhà máy sản xuất thuốc thú y đạt tiêu chuẩn GMP-WHO được xây dựng trên diện tích hơn 20.000m2 có địa chỉ tại Khu Công nghiệp Tân Quang, Bình Lương – Tân Quang – Văn Lâm – Hưng Yên.',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              label: 'Image',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'commerce',
          type: 'group',
          label: 'Commerce Area',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              defaultValue: 'Thương mại',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              defaultValue: 'GOLDVET đang phân phối hơn 600 sản phẩm thuốc thú y với mạng lưới phân phối rộng khắp trên 63 tỉnh thành trong nước. Bên cạnh đó, sản phẩm của GOLDVET còn chinh phục và bước đầu đã tạo được vị thế tại các nước trong khu vực như: Lào, Campuchia, Mông Cổ…',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              label: 'Image',
              relationTo: 'media',
            },
          ],
        },
      ],
    },

    // History Section
    {
      name: 'history',
      type: 'group',
      label: 'History & Development',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          defaultValue: 'Lịch sử hình thành & phát triển',
          required: true,
        },
        {
          name: 'timelineImage',
          type: 'upload',
          label: 'Timeline Image',
          relationTo: 'media',
        },
        {
          name: 'milestones',
          type: 'array',
          label: 'Historical Milestones',
          fields: [
            {
              name: 'year',
              type: 'text',
              label: 'Year',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              required: true,
            },
          ],
          defaultValue: [
            {
              year: '1973',
              description: 'Ngày 23/03/1973 – Theo Quyết định số 97 NN-TCQĐ của Bộ Nông Nghiệp tách Công ty Thuốc trừ sâu thú y trực thuộc Tổng Công ty vật tư nông nghiệp thành lập Công ty vật tư chăn nuôi Thú y cấp I.',
            },
            {
              year: '1989',
              description: 'Tháng 11/1989, Công ty vật tư chăn nuôi Thú y cấp I đổi tên thành Công ty Vật tư Thú y TWI.',
            },
            {
              year: '2000',
              description: 'Bộ NN & PTNT có Quyết định số 06/2000/QĐBNN-TC, chuyển Công ty vật tư thú y TWI thành Công ty CP thuốc thú y TWI hoạt động theo luật Doanh nghiệp và điều lệ Công ty cổ phần, vốn ban đầu 7 tỷ đồng.',
            },
            {
              year: '2004',
              description: 'Ngày 5/5/2004: Thành lập Công ty TNHH thuốc thú y TW1 với Chủ sở hữu là Công ty CP thuốc thú y Trung ương I.',
            },
            {
              year: '2007',
              description: 'Xây dựng Nhà máy đạt tiêu chuẩn thực hành tốt sản xuất thuốc GMP-WHO, với diện tích hơn 20.000m2 đặt tại thôn Bình Lương, xã Tân Quang, huyện Văn Lâm, tỉnh Hưng Yên.',
            },
            {
              year: '2009',
              description: 'Tháng 6/2009: Công ty CP thuốc thú y Trung ương I (Công ty mẹ) phát hành cho cổ đông hiện hữu, tăng vốn điều lệ lên 66 tỷ đồng.',
            },
            {
              year: '2011',
              description: 'Tháng 5/2011: Công ty đăng ký lưu ký chứng khoán lần đầu tại Trung tâm lưu ký chứng khoán Việt Nam với mã chứng khoán VNY.',
            },
            {
              year: '2023',
              description: 'Ngày 27/7/2023: Điều chỉnh ĐKDN lần 7 và tăng vốn điều lệ 70 tỷ đồng.',
            },
          ],
        },
      ],
    },

    // Achievements Section
    {
      name: 'achievements',
      type: 'group',
      label: 'Achievements & Certifications',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          defaultValue: 'Thành tích & chứng nhận',
          required: true,
        },
        {
          name: 'achievementItems',
          type: 'array',
          label: 'Achievement Items',
          fields: [
            {
              name: 'number',
              type: 'text',
              label: 'Number',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
            },
          ],
          defaultValue: [
            { number: '50+', label: 'Năm kinh nghiệm' },
            { number: '200+', label: 'Sản phẩm' },
            { number: '1000+', label: 'Đối tác' },
            { number: '95%', label: 'Hài lòng' },
          ],
        },
        {
          name: 'certificationImages',
          type: 'array',
          label: 'Certification Images',
          fields: [
            {
              name: 'image',
              type: 'upload',
              label: 'Image',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },

    // Vision Section
    {
      name: 'vision',
      type: 'group',
      label: 'Vision',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          defaultValue: 'Tầm nhìn',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          defaultValue: 'Trở thành Công ty hàng đầu tại Việt Nam và khu vực về nghiên cứu phát triển và đưa ra giải pháp hiệu quả, an toàn nhất trong chăn nuôi.',
          required: true,
        },
      ],
    },

    // Mission Section
    {
      name: 'mission',
      type: 'group',
      label: 'Mission',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          defaultValue: 'Sứ mệnh',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          defaultValue: 'Mang lại sản phẩm và dịch vụ chất lượng, hiệu quả cao cho nhà chăn nuôi, góp phần phát triển bền vững ngành dược thú y và bảo vệ sức khỏe cộng đồng.',
          required: true,
        },
      ],
    },

    // Core Values Section
    {
      name: 'coreValues',
      type: 'group',
      label: 'Core Values',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          defaultValue: 'Giá trị cốt lõi',
          required: true,
        },
        {
          name: 'values',
          type: 'array',
          label: 'Core Values',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              required: true,
            },
          ],
          defaultValue: [
            { title: 'Bền vững', description: 'Cam kết phát triển bền vững, thân thiện môi trường' },
            { title: 'Chất lượng', description: 'Sản phẩm đạt chuẩn quốc tế, an toàn hiệu quả' },
            { title: 'Tận tâm', description: 'Đặt lợi ích khách hàng và đối tác lên hàng đầu' },
            { title: 'Đổi mới', description: 'Không ngừng sáng tạo và cải tiến công nghệ' },
          ],
        },
      ],
    },

    // Strategic Partners Section
    {
      name: 'partners',
      type: 'group',
      label: 'Strategic Partners',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          defaultValue: 'Đối tác chiến lược',
          required: true,
        },
        {
          name: 'partnerLogos',
          type: 'array',
          label: 'Partner Logos',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              label: 'Logo',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'name',
              type: 'text',
              label: 'Partner Name',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
