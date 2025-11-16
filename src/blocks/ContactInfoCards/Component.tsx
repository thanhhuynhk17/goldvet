'use client'

import React from 'react'
import { Phone, Mail, MapPin, Clock, MessageCircle, Facebook } from 'lucide-react'
import Link from 'next/link'

type ContactCard = {
  icon: 'phone' | 'email' | 'location' | 'clock' | 'whatsapp' | 'facebook'
  title: string
  content: string
  link?: string
  isPrimary?: boolean
}

type ContactInfoCardsBlockProps = {
  cards: ContactCard[]
}

const iconMap = {
  phone: Phone,
  email: Mail,
  location: MapPin,
  clock: Clock,
  whatsapp: MessageCircle,
  facebook: Facebook,
}

export const ContactInfoCards: React.FC<ContactInfoCardsBlockProps> = ({ cards }) => {
  if (!cards?.length) return null

  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const IconComponent = iconMap[card.icon]
            const CardContent = (
              <div
                className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg ${
                  card.isPrimary
                    ? 'bg-green-50 border-green-200 hover:border-green-300'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-lg ${
                      card.isPrimary
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <IconComponent size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {card.content}
                    </p>
                  </div>
                </div>
              </div>
            )

            if (card.link) {
              return (
                <Link
                  key={index}
                  href={card.link}
                  className="block group"
                >
                  <div className="h-full group-hover:scale-105 transition-transform duration-300">
                    {CardContent}
                  </div>
                </Link>
              )
            }

            return (
              <div key={index} className="h-full">
                {CardContent}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
