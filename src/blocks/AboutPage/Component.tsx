import { getCachedGioiThieuPage } from '@/actions/gioi-thieu';
import { AboutPageClient } from './AboutPageClient';

interface AboutPageBlockProps {
  headerTitle?: string
  headerBackgroundColor?: 'green' | 'blue' | 'dark'
  generalIntro?: {
    title: string
    description: string
    image?: any
  }
  businessAreas?: {
    title: string
    research: {
      title: string
      description: string
      image?: any
    }
    production: {
      title: string
      description: string
      image?: any
    }
    commerce: {
      title: string
      description: string
      image?: any
    }
  }
  history?: {
    title: string
    timelineImage?: any
    milestones?: Array<{
      year: string
      event: string
      description: string
    }>
  }
  achievements?: {
    title: string
    achievementItems?: Array<{
      number: string
      label: string
    }>
    certificationImages?: Array<{
      image: any
    }>
  }
  vision?: {
    title: string
    description: string
  }
  mission?: {
    title: string
    description: string
  }
  coreValues?: {
    title: string
    values?: Array<{
      title: string
      description: string
      icon?: string
    }>
  }
  partners?: {
    title: string
    partnerLogos?: Array<{
      logo: any
      name: string
    }>
  }
  id?: string | number
  className?: string
}

export const AboutPageBlock: React.FC<AboutPageBlockProps> = async (props) => {
  // Fetch data from PayloadCMS
  const pageData = await getCachedGioiThieuPage();

  // Extract the aboutPage block data from the layout
  const aboutPageBlock = pageData?.layout?.find((block: any) => block.blockType === 'aboutPage');

  if (aboutPageBlock) {
    // Clean the CMS data by removing null values and converting to expected types
    const cleanBlockData = Object.fromEntries(
      Object.entries(aboutPageBlock).map(([key, value]) => [
        key,
        value === null ? undefined : value
      ])
    );

    // Merge the CMS data with props
    const mergedProps = {
      ...props,
      ...cleanBlockData,
    };
    return <AboutPageClient {...mergedProps} />;
  }

  // // Fallback to props if no CMS data
  // return <AboutPageClient {...props} />;
};
