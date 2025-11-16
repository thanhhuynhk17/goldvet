'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

type ContactInfoType = {
  title: string
  companyName: string
  address: string
  phone: string
  email: string
  businessHours: string
  showMap?: boolean
  mapEmbed?: string
}

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

export const ContactInfo: React.FC<ContactInfoType> = ({
  title,
  companyName,
  address,
  phone,
  email,
  businessHours,
  showMap,
  mapEmbed,
}) => {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h2>
          <div className="w-20 h-1 bg-green-600 mx-auto"></div>
        </div>

        {/* All contact items in single line horizontal layout */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 w-full">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg flex-shrink-0">
                <Phone size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-gray-900 mb-1">Hotline</h4>
                <Link
                  href={`tel:${phone}`}
                  className="text-gray-600 hover:text-green-600 transition-colors text-sm"
                >
                  {phone}
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg flex-shrink-0">
                <Mail size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-gray-900 mb-1">Email</h4>
                <Link
                  href={`mailto:${email}`}
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  {email}
                </Link>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg flex-shrink-0 mt-0.5">
                <MapPin size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-gray-900 mb-1">Địa chỉ</h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {address}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg flex-shrink-0 mt-0.5">
                <Clock size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-gray-900 mb-1">Giờ làm việc</h4>
                <div className="text-gray-600 whitespace-pre-line text-sm">
                  {businessHours.replace(/\n/g, ' • ')}
                </div>
              </div>
            </div>
          </div>
        </div>



        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200/30 hover:shadow-2xl hover:shadow-gray-300/40 transition-all duration-300"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {companyName}
          </h3>
          <div className="w-20 h-1 bg-green-600 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-gray-600">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:border-green-200 transition-colors"
            >
              <strong className="text-gray-900 font-semibold block mb-2">Địa chỉ</strong>
              <p className="text-sm leading-relaxed">{address}</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:border-green-200 transition-colors"
            >
              <strong className="text-gray-900 font-semibold block mb-2">Điện thoại</strong>
              <p className="text-sm leading-relaxed">{phone}</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:border-green-200 transition-colors"
            >
              <strong className="text-gray-900 font-semibold block mb-2">Email</strong>
              <p className="text-sm leading-relaxed">{email}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Map Section */}
        {showMap && mapEmbed && (
          <div className="mt-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Bản đồ
              </h3>
              <div
                className="w-full h-96 rounded-lg overflow-hidden"
                dangerouslySetInnerHTML={{ __html: mapEmbed }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.section>
  )
}
