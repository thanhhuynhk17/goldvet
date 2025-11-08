import { cn } from '@/utilities/cn'
import React from 'react'

interface AboutSectionBlockProps {
  titleLine1?: string
  titleLine2?: string
  description?: string
  video?: any
  backgroundImage?: any
  id?: string | number
  className?: string
}

export const AboutSectionBlock: React.FC<AboutSectionBlockProps> = ({
  className,
  titleLine1 = 'Tự hào hơn 50 năm',
  titleLine2 = 'Hành trình Vì sức khỏe cộng đồng',
  description,
  video,
  backgroundImage
}) => {
  return (
    <section className={cn('relative py-20 bg-white overflow-hidden', className)}>
      {/* World Map Background Overlay */}
      <div
        className="absolute inset-0 opacity-5 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1200' height='800' viewBox='0 0 1200 800' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M600 400c0-110.46-89.54-200-200-200s-200 89.54-200 200 89.54 200 200 200 200-89.54 200-200zM400 200c-165.69 0-300 134.31-300 300s134.31 300 300 300 300-134.31 300-300-134.31-300-300-300z' stroke='%23000000' stroke-width='2' fill='none'/%3E%3Cpath d='M200 400h800M600 100v600' stroke='%23000000' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title Section */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-red-600 mb-4 leading-tight">
              {titleLine1}
            </h2>
            <div className="w-12 h-1 bg-green-600 mx-auto mb-4"></div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-700 leading-tight">
              {titleLine2}
            </h3>
          </div>

          {/* Description */}
          {description && (
            <div className="mb-12">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                {description}
              </p>
            </div>
          )}

          {/* Video Section */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative rounded-2xl shadow-2xl overflow-hidden aspect-video bg-gradient-to-br from-green-100 to-blue-100">
              {/* Placeholder for video - using a grass field image */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-green-100 to-blue-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-green-800 font-semibold text-lg">Khám phá hành trình của chúng tôi</p>
                    <p className="text-green-600 text-sm mt-1">Video về sứ mệnh và giá trị cốt lõi</p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-16 h-16 bg-white/20 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 rounded-full"></div>
                <div className="absolute top-1/2 right-8 w-8 h-8 bg-white/20 rounded-full"></div>
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 group">
                  <svg
                    className="w-8 h-8 text-white ml-1 group-hover:ml-2 transition-all duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Subtle shadow effect */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-black/10 rounded-full blur-sm"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
