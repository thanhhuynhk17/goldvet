'use client'
import type { StatisticsBlock as StatisticsBlockProps } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { useEffect, useState } from 'react'

export const StatisticsBlock: React.FC<
  StatisticsBlockProps & {
    id?: string | number
    className?: string
  }
> = ({ className, stats }) => {
  const [counters, setCounters] = useState<number[]>([])

  useEffect(() => {
    if (!stats?.length) return

    // Initialize counters to 0
    setCounters(new Array(stats.length).fill(0))

    // Start counting animation after a short delay
    const startDelay = setTimeout(() => {
      const timers = stats.map((stat, index) => {
        const target = parseInt(stat.number.replace(/\D/g, '')) || 0
        const increment = target / 100 // Animate over 100 steps
        let current = 0

        return setInterval(() => {
          current += increment
          if (current >= target) {
            current = target
            clearInterval(timers[index])
          }

          setCounters(prev => {
            const newCounters = [...prev]
            newCounters[index] = Math.floor(current)
            return newCounters
          })
        }, 20) // Update every 20ms for smooth animation
      })

      return () => timers.forEach(clearInterval)
    }, 500) // Start animation after 500ms

    return () => clearTimeout(startDelay)
  }, [stats])

  if (!stats?.length) return null

  return (
    <div className={cn('py-16 bg-gray-50', className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                {counters[index] || 0}
                {stat.number.replace(/^\d+/, '')}
              </div>
              <div className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
                {stat.label}
              </div>
              <div className="text-sm md:text-base text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
