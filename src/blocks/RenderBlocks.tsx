import { AboutSectionBlock } from '@/blocks/AboutSection/Component'
import { ProductSectionBlock } from '@/blocks/ProductSection/Component'
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
import { StatisticsBlock } from '@/blocks/Statistics/Component'
import { ThreeItemGridBlock } from '@/blocks/ThreeItemGrid/Component'
import { toKebabCase } from '@/utilities/toKebabCase'
import React, { Fragment } from 'react'

import type { Page } from '../payload-types'

const blockComponents = {
  aboutSection: AboutSectionBlock,
  productSection: ProductSectionBlock,
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

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block

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
