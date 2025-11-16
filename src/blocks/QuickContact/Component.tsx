'use client'

import { motion } from 'framer-motion'
import { Facebook, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type QuickContactType = {
  title: string
  contacts: Array<{
    platform: 'whatsapp' | 'zalo' | 'phone' | 'facebook'
    label: string
    value: string
  }>
  backgroundColor?: 'white' | 'gray'
}

const iconMap = {
  whatsapp: MessageCircle,
  zalo: MessageCircle,
  phone: MessageCircle, // Using MessageCircle as fallback
  facebook: Facebook,
}

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

export const QuickContact: React.FC<QuickContactType> = ({
  title,
  contacts,
  backgroundColor = 'gray'
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
          <div className="w-20 h-1 bg-green-600 mx-auto"></div>
        </div>

        <motion.div
          whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center max-w-5xl mx-auto"
        >
          {contacts.map((contact, index) => {
            const IconComponent = iconMap[contact.platform] || MessageCircle
            const href = contact.platform === 'whatsapp'
              ? `https://wa.me/${contact.value.replace('+', '')}`
              : contact.platform === 'phone'
              ? `tel:${contact.value}`
              : contact.platform === 'facebook'
              ? `https://facebook.com/${contact.value}`
              : `https://zalo.me/${contact.value}`

            return (
              <motion.div
                key={index}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border-t-4 border-green-600 hover:border-green-700 hover:shadow-2xl hover:shadow-gray-300/40 transition-all duration-300 group w-full max-w-md block"
                >
                  <div className="flex items-center space-x-6 text-center">
                    <div className="p-4 bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-xl group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300 flex-shrink-0">
                      <IconComponent size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                        {contact.label}
                      </h3>
                      <p className="text-gray-600 text-base group-hover:text-gray-700 transition-colors">
                        {contact.value}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}
