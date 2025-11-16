'use client'

import React from 'react'
import { motion } from 'framer-motion'

import { Media } from '@/components/Media'

type CertificationsType = {
  title: string
  certificationItems: Array<{
    name: string
    image?: any
    description?: string
  }>
  backgroundColor?: 'white' | 'gray'
}

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

export const Certifications: React.FC<CertificationsType> = ({
  title,
  certificationItems,
  backgroundColor = 'white'
}) => {
  const bgClass = backgroundColor === 'gray' ? 'bg-gray-50' : 'bg-white'

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className={`py-20 px-6 md:px-8 ${bgClass}`}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 max-w-4xl mx-auto"
        >
          {certificationItems.map((cert, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white p-8 rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-200/30 text-center w-full hover:shadow-xl hover:shadow-gray-300/40 transition-all duration-300 group"
            >
              {cert.image && (
                <div className="mb-6 flex justify-center">
                  <Media
                    resource={cert.image}
                    className="max-w-20 max-h-20 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              )}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                {cert.name}
              </h3>
              {cert.description && (
                <p className="text-gray-600 text-base leading-relaxed">
                  {cert.description}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
