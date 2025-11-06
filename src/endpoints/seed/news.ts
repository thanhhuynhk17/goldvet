import type { Category, News, Media } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

type NewsArgs = {
  featuredImage: Media
  categories: Category[]
}

export const newsCompanyData: (args: NewsArgs) => RequiredDataFromCollectionSlug<'news'> = ({
  featuredImage,
  categories,
}) => {
  return {
    title: 'Vinatetco Kỷ Niệm 50 Năm Phát Triển',
    slug: 'vinatetco-ky-niem-50-nam-phat-trien',
    excerpt: 'Công ty Thuốc Thú Y TW1 (Vinatetco) tự hào kỷ niệm 50 năm cống hiến cho ngành dược thú y Việt Nam.',
    content: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Sau 50 năm hình thành và phát triển, Vinatetco đã trở thành thương hiệu uy tín hàng đầu trong lĩnh vực dược thú y tại Việt Nam. Với sứ mệnh cung cấp các giải pháp chăm sóc sức khỏe động vật toàn diện, chúng tôi đã đồng hành cùng hàng nghìn hộ nông dân và doanh nghiệp chăn nuôi trên khắp cả nước.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Trong suốt 5 thập kỷ qua, Vinatetco đã đạt được nhiều thành tựu quan trọng:',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: '• Xây dựng nhà máy sản xuất đạt chuẩn GMP-WHO',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: '• Phát triển hơn 200 loại sản phẩm dược thú y',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: '• Xuất khẩu sản phẩm sang hơn 30 quốc gia',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    featuredImage: featuredImage.id,
    category: 'company',
    publishedDate: '2025-11-01T00:00:00.000Z',
    featured: true,
  }
}

export const newsIndustryData: (args: NewsArgs) => RequiredDataFromCollectionSlug<'news'> = ({
  featuredImage,
  categories,
}) => {
  return {
    title: 'Xu Hướng Nuôi Trồng Thủy Sản Bền Vững Tại Việt Nam',
    slug: 'xu-huong-nuoi-trong-thuy-san-ben-vung-tai-viet-nam',
    excerpt: 'Ngành nuôi trồng thủy sản Việt Nam đang chuyển hướng sang các mô hình bền vững, thân thiện với môi trường.',
    content: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Ngành nuôi trồng thủy sản Việt Nam đang chứng kiến sự chuyển biến mạnh mẽ hướng tới các mô hình sản xuất bền vững. Theo số liệu từ Bộ Nông nghiệp và Phát triển nông thôn, sản lượng thủy sản năm 2024 đạt hơn 9 triệu tấn, tăng 2.5% so với năm trước.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Các xu hướng chính trong ngành bao gồm:',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: '• Áp dụng công nghệ nuôi trồng thủy sản tuần hoàn (RAS)',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: '• Sử dụng thức ăn thủy sản hữu cơ, thân thiện môi trường',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: '• Triển khai hệ thống quản lý chất lượng nghiêm ngặt',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    featuredImage: featuredImage.id,
    category: 'industry',
    publishedDate: '2025-10-28T00:00:00.000Z',
    featured: false,
  }
}

export const newsVaccineData: (args: NewsArgs) => RequiredDataFromCollectionSlug<'news'> = ({
  featuredImage,
  categories,
}) => {
  return {
    title: 'Công Nghệ Vaccine Mới Phòng Bệnh Cho Gia Súc',
    slug: 'cong-nghe-vaccine-moi-phong-benh-cho-gia-suc',
    excerpt: 'Vinatetco giới thiệu công nghệ vaccine thế hệ mới với hiệu quả bảo vệ cao hơn 95%.',
    content: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Vinatetco vừa chính thức giới thiệu dòng vaccine thế hệ mới sử dụng công nghệ protein tái tổ hợp. Các sản phẩm này mang lại hiệu quả bảo vệ lên tới 95% đối với các bệnh truyền nhiễm phổ biến ở gia súc.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Ưu điểm nổi bật của công nghệ mới:',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: '• An toàn tuyệt đối, không gây phản ứng phụ',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: '• Thời gian bảo vệ kéo dài 12-18 tháng',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: '• Chi phí sản xuất thấp, dễ tiếp cận với nông dân',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    featuredImage: featuredImage.id,
    category: 'company',
    publishedDate: '2025-10-25T00:00:00.000Z',
    featured: true,
  }
}
