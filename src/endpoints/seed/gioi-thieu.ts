import { RequiredDataFromCollectionSlug } from 'payload'

export const gioiThieuData: () => RequiredDataFromCollectionSlug<'pages'> = () => {
  return {
    slug: 'gioi-thieu',
    _status: 'published',
    hero: {
      type: 'lowImpact',
      richText: {
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
                  text: 'Giới thiệu - Goldvet',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              tag: 'h1',
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Hơn 50 năm tiên phong trong lĩnh vực dược phẩm thú y, mang đến những giải pháp chăm sóc sức khỏe động vật toàn diện',
                  version: 1,
                },
              ],
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
        blockType: 'aboutPage',
        blockName: 'About Page Content',
        headerTitle: 'Giới thiệu - Goldvet',
        headerBackgroundColor: 'green',
        generalIntro: {
          title: 'Giới thiệu công ty',
          description: 'Công ty TNHH Nông Nghiệp Tập Đoàn GOLDVET là công ty chuyên sản xuất và kinh doanh thuốc thú y lâu đời nhất tại Việt Nam. Với bề dày kinh nghiệm trên 50 năm, GOLDVET luôn không ngừng đổi mới công nghệ, trang thiết bị sản xuất, cộng với đội ngũ cán bộ kỹ thuật được đào tạo chuyên môn sâu và các chuyên gia cố vấn là những giáo sư, phó giáo sư, tiến sĩ hàng đầu ngành thú y Việt Nam để cho ra thị trường những sản phẩm tốt nhất.',
        },
        businessAreas: {
          title: 'Lĩnh vực hoạt động',
          research: {
            title: 'Nghiên cứu & Phát triển',
            description: 'Đội ngũ chuyên gia hàng đầu nghiên cứu các giải pháp dược phẩm tiên tiến',
          },
          production: {
            title: 'Sản xuất',
            description: 'Nhà máy đạt chuẩn GMP quốc tế với công nghệ hiện đại',
          },
          commerce: {
            title: 'Thương mại',
            description: 'Mạng lưới phân phối rộng khắp toàn quốc và khu vực',
          },
        },
        history: {
          title: 'Lịch sử phát triển',
          milestones: [
            {
              year: '1970',
              event: 'Thành lập công ty',
              description: 'Bắt đầu hành trình phát triển dược phẩm thú y',
            },
            {
              year: '1990',
              event: 'Mở rộng sản xuất',
              description: 'Đầu tư nhà máy hiện đại đạt chuẩn GMP',
            },
            {
              year: '2005',
              event: 'Hợp tác quốc tế',
              description: 'Ký kết đối tác chiến lược với các tập đoàn toàn cầu',
            },
            {
              year: '2020',
              event: 'Công nghệ tiên tiến',
              description: 'Ứng dụng công nghệ sinh học tiên tiến',
            },
          ],
        },
        achievements: {
          title: 'Thành tựu nổi bật',
          achievementItems: [
            { number: '50+', label: 'Năm kinh nghiệm' },
            { number: '200+', label: 'Sản phẩm' },
            { number: '1000+', label: 'Đối tác' },
            { number: '95%', label: 'Hài lòng' },
          ],
        },
        vision: {
          title: 'Tầm nhìn',
          description: 'Trở thành công ty dược phẩm thú y hàng đầu Đông Nam Á, tiên phong trong nghiên cứu và ứng dụng công nghệ sinh học',
        },
        mission: {
          title: 'Sứ mệnh',
          description: 'Cung cấp sản phẩm chất lượng cao, góp phần phát triển bền vững ngành chăn nuôi và bảo vệ sức khỏe cộng đồng',
        },
        coreValues: {
          title: 'Giá trị cốt lõi',
          values: [
            { title: 'Bền vững', description: 'Cam kết phát triển bền vững, thân thiện môi trường' },
            { title: 'Chất lượng', description: 'Sản phẩm đạt chuẩn quốc tế, an toàn hiệu quả' },
            { title: 'Tận tâm', description: 'Đặt lợi ích khách hàng và đối tác lên hàng đầu' },
            { title: 'Đổi mới', description: 'Không ngừng sáng tạo và cải tiến công nghệ' },
          ],
        },
        partners: {
          title: 'Đối tác chiến lược',
          partnerLogos: [], // Empty array for now, will show placeholder grid
        },
      },
    ],
    meta: {
      description: 'Tìm hiểu về Công ty TNHH Nông Nghiệp Tập Đoàn GOLDVET - đơn vị hàng đầu Việt Nam về sản xuất và phân phối thuốc thú y chất lượng cao.',
      title: 'Giới thiệu - Công ty TNHH Nông Nghiệp Tập Đoàn GOLDVET',
    },
    title: 'Giới thiệu',
  }
}
