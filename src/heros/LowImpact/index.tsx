'use client'

import React from 'react'
import { motion } from 'framer-motion'

import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
      media?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
      media?: Page['hero']['media']
    })

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText, media }) => {
  // Extract title and description from rich text
  const extractTextContent = (richTextData: any) => {
    if (!richTextData?.root?.children) return { title: '', description: '' }

    const children = richTextData.root.children
    let title = ''
    let description = ''

    // First heading is title, first paragraph is description
    for (const child of children) {
      if (child.type === 'heading' && child.children?.[0]?.text && !title) {
        title = child.children[0].text
      } else if (child.type === 'paragraph' && child.children?.[0]?.text && !description) {
        description = child.children[0].text
      }
      if (title && description) break
    }

    return { title, description }
  }

  const { title, description } = richText ? extractTextContent(richText) : { title: '', description: '' }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="relative py-20 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800 opacity-95"></div>

      {/* Use custom media if available, otherwise default background */}
      {media && typeof media === 'object' && media.url ? (
        <div className="absolute inset-0">
          <Media
            resource={media}
            fill
            className="object-cover mix-blend-overlay opacity-20"
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
            {description}
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
