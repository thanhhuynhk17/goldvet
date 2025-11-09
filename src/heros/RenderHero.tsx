'use client'

import React from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}
  const pathname = usePathname()

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  // Add key prop that changes with pathname to reset animations only on page navigation
  // This prevents hero refresh when interacting with filters (search params change)
  return <HeroToRender key={pathname} {...props} />
}
