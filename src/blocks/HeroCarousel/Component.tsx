'use client'
import type { HeroCarouselBlock as HeroCarouselBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const HeroCarouselBlock: React.FC<
  HeroCarouselBlockProps & {
    id?: string | number
    className?: string
  }
> = ({ className, slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!slides?.length) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides?.length])

  if (!slides?.length) return null

  return (
    <div className={cn('relative h-screen w-full overflow-hidden', className)}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {slide.image && typeof slide.image === 'object' && slide.image.url && (
            <Image
              src={slide.image.url}
              alt={slide.title || 'Hero image'}
              fill
              className="object-cover"
              priority={index === 0}
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
            <div className="container mx-auto px-4 text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl">
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90">
                  {slide.subtitle}
                </p>
              )}
              {slide.link && (
                <Link
                  href={slide.link.url}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                >
                  {slide.link.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
