'use client'
import React from 'react'
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react'

interface SocialLink {
  platform: string
  url: string
  label?: string
}

interface SocialMediaButtonsProps {
  socialLinks: SocialLink[]
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'facebook':
      return Facebook
    case 'instagram':
      return Instagram
    case 'linkedin':
      return Linkedin
    case 'youtube':
      return Youtube
    case 'twitter':
      return Twitter
    default:
      return Facebook
  }
}

const getSocialColor = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'facebook':
      return 'bg-blue-600 hover:bg-blue-700'
    case 'instagram':
      return 'bg-pink-600 hover:bg-pink-700'
    case 'linkedin':
      return 'bg-blue-700 hover:bg-blue-800'
    case 'youtube':
      return 'bg-red-600 hover:bg-red-700'
    case 'twitter':
      return 'bg-sky-500 hover:bg-sky-600'
    default:
      return 'bg-gray-600 hover:bg-gray-700'
  }
}

export const SocialMediaButtons: React.FC<SocialMediaButtonsProps> = ({ socialLinks }) => {
  if (!socialLinks || socialLinks.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-3">
      {socialLinks.map((social, index) => {
        const IconComponent = getSocialIcon(social.platform)
        const colorClass = getSocialColor(social.platform)

        return (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 ${colorClass} rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105`}
            aria-label={social.label || `Follow us on ${social.platform}`}
            title={social.label || `Follow us on ${social.platform}`}
          >
            <IconComponent className="w-5 h-5" />
          </a>
        )
      })}
    </div>
  )
}
