'use client'

import React from 'react'
import { motion } from 'framer-motion'

type BusinessRegistrationType = {
  title: string
  taxCode: string
  issueDate: string
  issuedBy: string
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

export const BusinessRegistration: React.FC<BusinessRegistrationType> = ({
  title,
  taxCode,
  issueDate,
  issuedBy,
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
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          className="bg-white p-10 md:p-12 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200/30 hover:shadow-2xl hover:shadow-gray-300/40 transition-all duration-300 w-full max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-center">
            <motion.div
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border-t-4 border-green-600 hover:border-green-700 transition-colors shadow-lg"
            >
              <strong className="text-xl font-bold text-gray-900 block mb-4">Mã số thuế</strong>
              <p className="text-gray-700 text-lg leading-relaxed">{taxCode}</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-t-4 border-blue-600 hover:border-blue-700 transition-colors shadow-lg"
            >
              <strong className="text-xl font-bold text-gray-900 block mb-4">Ngày cấp</strong>
              <p className="text-gray-700 text-lg leading-relaxed">{issueDate}</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border-t-4 border-purple-600 hover:border-purple-700 transition-colors shadow-lg lg:col-span-1"
            >
              <strong className="text-xl font-bold text-gray-900 block mb-4">Nơi cấp</strong>
              <p className="text-gray-700 text-lg leading-relaxed">{issuedBy}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
