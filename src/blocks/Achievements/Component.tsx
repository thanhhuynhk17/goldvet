'use client'
import { cn } from '@/utilities/cn'
import { Shield, Factory, Box, Network } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const iconMap = {
  shield: Shield,
  factory: Factory,
  box: Box,
  network: Network,
}

type AchievementItem = {
  icon: 'shield' | 'factory' | 'box' | 'network'
  title: string
  description: string
}

type AchievementsBlockProps = {
  title?: string
  mainNumber?: string
  mainNumberLabel?: string
  tagline?: string
  achievements?: AchievementItem[]
}

export const AchievementsBlock: React.FC<
  AchievementsBlockProps & {
    id?: string | number
    className?: string
  }
> = ({ className, title, mainNumber, mainNumberLabel, tagline, achievements }) => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative w-full py-24 overflow-hidden',
        'bg-gradient-to-br from-[#006633] to-[#0f6b38]',
        className
      )}
    >
      {/* Background watermark pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-white"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-white"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full border border-white"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left side - Title and main number */}
          <div className="lg:col-span-2 text-center lg:text-left">
            <div
              className={cn(
                'transition-all duration-1000 transform',
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              )}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
                {title}
              </h2>

              <div className="mb-6">
                <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-2 leading-none">
                  {mainNumber}
                </div>
                <div className="text-xl md:text-2xl font-bold text-white/90 mb-2">
                  {mainNumberLabel}
                </div>
                <div className="text-lg text-white/80 font-medium">
                  {tagline}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Achievement grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {achievements?.map((achievement, index) => {
                const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Shield

                return (
                  <div
                    key={index}
                    className={cn(
                      'text-center transition-all duration-1000 transform',
                      isVisible
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-8 opacity-0'
                    )}
                    style={{
                      transitionDelay: isVisible ? `${(index + 1) * 200}ms` : '0ms'
                    }}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-white/30 mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">
                      {achievement.title}
                    </h3>

                    <p className="text-sm text-white/70 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
