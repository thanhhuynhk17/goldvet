'use client'

import React from 'react'
import { motion } from 'framer-motion'

import type { Form } from '@payloadcms/plugin-form-builder/types'
import { FormBlock } from '@/blocks/Form/Component'

type ContactFormType = {
  title: string
  subtitle?: string
  form: Form
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

export const ContactForm: React.FC<ContactFormType> = ({
  title,
  subtitle,
  form,
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
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-white via-gray-50/50 to-white p-10 md:p-12 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-200/30 backdrop-blur-sm">
            <div className="bg-white/90 p-8 md:p-10 rounded-2xl border border-gray-100/50 shadow-lg shadow-gray-100/25 backdrop-blur-sm">
              <FormBlock
                blockType="formBlock"
                enableIntro={false}
                form={form}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
