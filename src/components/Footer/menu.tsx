import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import React from 'react'

interface Props {
  menu: Footer['navItems']
}

export function FooterMenu({ menu }: Props) {
  if (!menu?.length) return null

  return (
    <nav>
      <ul className="space-y-2">
        {menu.map((item) => {
          return (
            <li key={item.id}>
              <CMSLink
                appearance="link"
                className="text-white/80 hover:text-white transition-colors duration-200 underline-offset-4 hover:underline"
                {...item.link}
              />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
