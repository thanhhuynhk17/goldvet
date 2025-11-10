'use client'
import type { HeroCarouselBlock as HeroCarouselBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
      setCurrentSlide((prev) => (prev + 1) % (slides?.length || 1))
    }, 5000)

    return () => clearInterval(timer)
  }, [slides?.length])

  const goToPrevious = () => {
    if (!slides?.length) return
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    if (!slides?.length) return
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  if (!slides?.length) return null

  return (
    <div className={cn('relative min-h-screen w-full overflow-hidden', className)}>
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
          {/* Green Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-gray-600/50 to-transparent" />

          {/* Content positioned in lower middle area */}
          <div className="absolute bottom-32 left-8 right-8 text-white max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90 leading-relaxed">
                {slide.subtitle}
              </p>
            )}
            {slide.link && (
              <Link
                href={slide.link.url}
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                {slide.link.label}
              </Link>
            )}
          </div>
        </div>
      ))}

      {/* Left/Right navigation arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
