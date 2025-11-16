import React from 'react'
import { motion } from 'framer-motion'

import { Media } from '@/components/Media'

type ContactHeroType = {
  title: string
  subtitle: string
  backgroundImage?: any
  backgroundColor?: 'green' | 'blue' | 'gray'
}

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

export const ContactHero: React.FC<ContactHeroType> = ({
  title,
  subtitle,
  backgroundImage,
  backgroundColor = 'green'
}) => {
  // Background color classes
  const bgColorClasses = {
    green: 'from-green-600 to-green-800',
    blue: 'from-blue-600 to-blue-800',
    gray: 'from-gray-600 to-gray-800'
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="relative py-20 px-4 overflow-hidden"
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgColorClasses[backgroundColor]} opacity-95`}></div>

      {/* Background image if provided */}
      {backgroundImage && typeof backgroundImage === 'object' && backgroundImage.url ? (
        <div className="absolute inset-0">
          <Media
            resource={backgroundImage}
            fill
            imgClassName="object-cover object-center mix-blend-overlay opacity-20"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
      )}

      <div className="relative max-w-7xl mx-auto text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
