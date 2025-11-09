'use client';

import { motion, Variants } from 'framer-motion';
import { Award, Target, TrendingUp, Users, Factory, FlaskConical, Leaf, ChevronRight } from 'lucide-react';
import { useState, useTransition, useEffect } from 'react';
import { getAboutPageData } from '@/actions/gioi-thieu';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  }
};

interface AboutPageClientProps {
  headerTitle?: string
  headerBackgroundColor?: 'green' | 'blue' | 'dark'
  generalIntro?: {
    title: string
    description: string
    image?: any
  }
  businessAreas?: {
    title: string
    research: {
      title: string
      description: string
      image?: any
    }
    production: {
      title: string
      description: string
      image?: any
    }
    commerce: {
      title: string
      description: string
      image?: any
    }
  }
  history?: {
    title: string
    timelineImage?: any
    milestones?: Array<{
      year: string
      event: string
      description: string
    }>
  }
  achievements?: {
    title: string
    achievementItems?: Array<{
      number: string
      label: string
    }>
    certificationImages?: Array<{
      image: any
    }>
  }
  vision?: {
    title: string
    description: string
  }
  mission?: {
    title: string
    description: string
  }
  coreValues?: {
    title: string
    values?: Array<{
      title: string
      description: string
      icon?: string
    }>
  }
  partners?: {
    title: string
    partnerLogos?: Array<{
      logo: any
      name: string
    }>
  }
}

export function AboutPageClient({
  headerTitle: propHeaderTitle = 'Giới thiệu - Goldvet',
  headerBackgroundColor: propHeaderBackgroundColor = 'green',
  generalIntro: propGeneralIntro,
  businessAreas: propBusinessAreas,
  history: propHistory,
  achievements: propAchievements,
  vision: propVision,
  mission: propMission,
  coreValues: propCoreValues,
  partners: propPartners
}: AboutPageClientProps) {
  const [aboutData, setAboutData] = useState<any>(null)
  const [isPending, startTransition] = useTransition()

  // Fetch data from PayloadCMS on component mount
  useEffect(() => {
    const fetchAboutData = async () => {
      startTransition(async () => {
        const result = await getAboutPageData()
        if (result.success) {
          setAboutData(result.data)
        } else {
          console.error('Failed to fetch about page data:', result.error)
        }
      })
    }

    fetchAboutData()
  }, [])

  // Use fetched data, fallback to props, then to defaults
  const headerTitle = aboutData?.headerTitle || propHeaderTitle
  const headerBackgroundColor = aboutData?.headerBackgroundColor || propHeaderBackgroundColor
  const generalIntro = aboutData?.generalIntro || propGeneralIntro
  const businessAreas = aboutData?.businessAreas || propBusinessAreas
  const history = aboutData?.history || propHistory
  const achievements = aboutData?.achievements || propAchievements
  const vision = aboutData?.vision || propVision
  const mission = aboutData?.mission || propMission
  const coreValues = aboutData?.coreValues || propCoreValues
  const partners = aboutData?.partners || propPartners

  const getHeaderBgClass = () => {
    switch (headerBackgroundColor) {
      case 'blue':
        return 'bg-blue-900'
      case 'green':
        return 'bg-green-600'
      case 'dark':
        return 'bg-gray-900'
      default:
        return 'bg-green-600'
    }
  }

  // Use CMS data if available, otherwise use defaults
  const timeline = history?.milestones || [
    { year: 1970, event: 'Thành lập công ty', description: 'Bắt đầu hành trình phát triển dược phẩm thú y' },
    { year: 1990, event: 'Mở rộng sản xuất', description: 'Đầu tư nhà máy hiện đại đạt chuẩn GMP' },
    { year: 2005, event: 'Hợp tác quốc tế', description: 'Ký kết đối tác chiến lược với các tập đoàn toàn cầu' },
    { year: 2020, event: 'Công nghệ tiên tiến', description: 'Ứng dụng công nghệ sinh học tiên tiến' },
  ];

  const businessAreasData = businessAreas ? [
    {
      icon: <FlaskConical className="w-8 h-8" />,
      title: businessAreas.research.title,
      description: businessAreas.research.description
    },
    {
      icon: <Factory className="w-8 h-8" />,
      title: businessAreas.production.title,
      description: businessAreas.production.description
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: businessAreas.commerce.title,
      description: businessAreas.commerce.description
    },
  ] : [
    {
      icon: <FlaskConical className="w-8 h-8" />,
      title: 'Nghiên cứu & Phát triển',
      description: 'Đội ngũ chuyên gia hàng đầu nghiên cứu các giải pháp dược phẩm tiên tiến'
    },
    {
      icon: <Factory className="w-8 h-8" />,
      title: 'Sản xuất',
      description: 'Nhà máy đạt chuẩn GMP quốc tế với công nghệ hiện đại'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Thương mại',
      description: 'Mạng lưới phân phối rộng khắp toàn quốc và khu vực'
    },
  ];

  const achievementsData = achievements?.achievementItems || [
    { number: '50+', label: 'Năm kinh nghiệm' },
    { number: '200+', label: 'Sản phẩm' },
    { number: '1000+', label: 'Đối tác' },
    { number: '95%', label: 'Hài lòng' },
  ];

  const coreValuesData = coreValues?.values || [
    {
      icon: <Leaf className="w-12 h-12" />,
      title: 'Bền vững',
      description: 'Cam kết phát triển bền vững, thân thiện môi trường'
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Chất lượng',
      description: 'Sản phẩm đạt chuẩn quốc tế, an toàn hiệu quả'
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Tận tâm',
      description: 'Đặt lợi ích khách hàng và đối tác lên hàng đầu'
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: 'Đổi mới',
      description: 'Không ngừng sáng tạo và cải tiến công nghệ'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Giới thiệu công ty</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Company facility"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent"></div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong className="text-green-700">Công ty TNHH Nông Nghiệp Tập Đoàn GOLDVET</strong> là công ty chuyên sản xuất và kinh doanh thuốc thú y lâu đời nhất tại Việt Nam. Với bề dày kinh nghiệm trên 50 năm, GOLDVET luôn không ngừng đổi mới công nghệ, trang thiết bị sản xuất, cộng với đội ngũ cán bộ kỹ thuật được đào tạo chuyên môn sâu và các chuyên gia cố vấn là những giáo sư, phó giáo sư, tiến sĩ hàng đầu ngành thú y Việt Nam để cho ra thị trường những sản phẩm tốt nhất.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Sứ mệnh của chúng tôi là cung cấp các sản phẩm dược phẩm chất lượng cao, góp phần nâng cao năng suất chăn nuôi và bảo vệ sức khỏe động vật. Chúng tôi cam kết không ngừng đổi mới và phát triển để đáp ứng nhu cầu ngày càng cao của thị trường.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                Tìm hiểu thêm
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 px-4 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Lĩnh vực hoạt động</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {businessAreasData.map((area: any, index: number) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow border border-green-100"
              >
                <div className="bg-green-600 text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  {area.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{area.title}</h3>
                <p className="text-gray-600 leading-relaxed">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 px-4 bg-gradient-to-br from-green-600 to-green-800 text-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Thành tựu nổi bật</h2>
            <div className="w-20 h-1 bg-white mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievementsData.map((achievement: any, index: number) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                  className="text-5xl md:text-6xl font-bold mb-2"
                >
                  {achievement.number}
                </motion.div>
                <div className="text-lg text-green-100">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 px-4 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Lịch sử phát triển</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto"></div>
          </motion.div>

          {/* Classic Alternating Timeline Layout */}
          <div className="relative max-w-4xl mx-auto">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-green-200 hidden md:block"></div>

            <div className="space-y-12">
              {timeline.map((item: any, index: number) => {
                const isEven = index % 2 === 0; // true for 0, 2, 4... (odd items in 1-based counting)

                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className={`relative flex items-center ${isEven ? 'justify-start' : 'justify-end'}`}
                  >
                    {/* Content and Timeline for alternating sides */}
                    {isEven ? (
                      // Odd items: Content left, Timeline right
                      <>
                        <div className="w-full md:w-5/12 pr-8 text-right">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-6 rounded-xl shadow-lg border-2 border-green-100 hover:border-green-300 transition-colors"
                          >
                            <h3 className="text-xl font-bold text-green-700 mb-2">{item.event}</h3>
                            <p className="text-gray-600">{item.description}</p>
                          </motion.div>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="relative z-10 bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0"
                        >
                          {item.year}
                        </motion.div>

                        <div className="w-full md:w-5/12 pl-8"></div>
                      </>
                    ) : (
                      // Even items: Timeline left, Content right
                      <>
                        <div className="w-full md:w-5/12 pr-8"></div>

                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="relative z-10 bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0"
                        >
                          {item.year}
                        </motion.div>

                        <div className="w-full md:w-5/12 pl-8 text-left">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-6 rounded-xl shadow-lg border-2 border-green-100 hover:border-green-300 transition-colors"
                          >
                            <h3 className="text-xl font-bold text-green-700 mb-2">{item.event}</h3>
                            <p className="text-gray-600">{item.description}</p>
                          </motion.div>
                        </div>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 px-4 bg-gradient-to-b from-green-50 to-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Giá trị cốt lõi</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValuesData.map((value: any, index: number) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all text-center border-t-4 border-green-600"
              >
                <div className="text-green-600 flex justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="py-20 px-4 bg-gradient-to-r from-green-700 to-green-900 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Tầm nhìn & Sứ mệnh</h2>
          <div className="w-20 h-1 bg-white mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
            >
              <Target className="w-16 h-16 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Tầm nhìn</h3>
              <p className="text-green-100 leading-relaxed">
                Trở thành công ty dược phẩm thú y hàng đầu Đông Nam Á, tiên phong trong nghiên cứu và ứng dụng công nghệ sinh học
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
            >
              <Award className="w-16 h-16 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Sứ mệnh</h3>
              <p className="text-green-100 leading-relaxed">
                Cung cấp sản phẩm chất lượng cao, góp phần phát triển bền vững ngành chăn nuôi và bảo vệ sức khỏe cộng đồng
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
