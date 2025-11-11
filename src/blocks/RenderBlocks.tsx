import { AboutSectionBlock } from '@/blocks/AboutSection/Component'
import { AboutPageBlock } from '@/blocks/AboutPage/Component'
import { ProductSectionBlock } from '@/blocks/ProductSection/Component'
import { StoreLayoutBlock } from '@/blocks/StoreLayout/Component'
import { AchievementsBlock } from '@/blocks/Achievements/Component'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CarouselBlock } from '@/blocks/Carousel/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { HeroCarouselBlock } from '@/blocks/HeroCarousel/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { NewsGridBlock } from '@/blocks/NewsGrid/Component'
import { ProductShowcaseBlock } from '@/blocks/ProductShowcase/Component'
import { ProductDetail } from '@/blocks/ProductDetail/Component'
import { StatisticsBlock } from '@/blocks/Statistics/Component'
import { ThreeItemGridBlock } from '@/blocks/ThreeItemGrid/Component'
import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { toKebabCase } from '@/utilities/toKebabCase'
import React, { Fragment } from 'react'

import type { Page } from '../payload-types'

const blockComponents = {
  aboutPage: AboutPageBlock,
  aboutSection: AboutSectionBlock,
  productSection: ProductSectionBlock,
  productDetail: ProductDetail,
  storeLayout: StoreLayoutBlock,
  achievements: AchievementsBlock,
  archive: ArchiveBlock,
  banner: BannerBlock,
  carousel: CarouselBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  heroCarousel: HeroCarouselBlock,
  mediaBlock: MediaBlock,
  newsGrid: NewsGridBlock,
  productShowcase: ProductShowcaseBlock,
  statistics: StatisticsBlock,
  threeItemGrid: ThreeItemGridBlock,
}

const heroComponents = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

export const RenderBlocks: React.FC<{
  blocks: (Page['layout'][0] | Page['hero'])[]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          // Check if this is a hero block (has 'type' property)
          if ('type' in block && block.type && block.type !== 'none' && block.type in heroComponents) {
            const HeroComponent = heroComponents[block.type as keyof typeof heroComponents]
            if (HeroComponent) {
              return <HeroComponent key={index} {...block} />
            }
          }

          // Handle regular layout blocks
          const { blockName, blockType } = block as Page['layout'][0]

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              // Remove margin for hero carousel (first block) to allow full height
              const isHeroCarousel = blockType === 'heroCarousel' && index === 0
              return (
                <div className={isHeroCarousel ? "" : "my-16"} key={index}>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore - weird type mismatch here */}
                  <Block id={toKebabCase(blockName!)} {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
