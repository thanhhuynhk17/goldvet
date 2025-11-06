# Vinavetco Frontend Clone Plan

**Project**: Clone vinavetco.com frontend using Payload CMS Ecommerce Template
**Date**: November 5, 2025
**Source Website**: https://vinavetco.com/

---

## Executive Summary

Vinavetco is a Vietnamese veterinary pharmaceutical company with over 50 years of experience in animal health products. The website showcases their comprehensive product catalog, company history, achievements, and industry leadership. This plan outlines the systematic approach to recreate their professional frontend using Payload CMS.

---

## Website Analysis

### Business Context
- **Company**: Công Ty Thuốc Thú Y TW1 (VINAVETCO)
- **Industry**: Veterinary pharmaceuticals
- **Products**: Animal health products for livestock, poultry, aquaculture, and pets
- **Market Position**: Oldest veterinary pharmaceutical company in Vietnam
- **Certifications**: GMP-WHO compliant manufacturing

### Target Audience
- **Primary**: Vietnamese farmers, livestock producers, veterinarians
- **Secondary**: Pet owners, aquaculture businesses, pharmaceutical distributors
- **Language**: Vietnamese (primary), potential English support

### Website Structure

#### 1. Homepage (`/`)
- **Hero Section**: Rotating banner carousel (4 slides)
- **Company Story**: "Proud Journey" section with history and video
- **Achievements**: Animated statistics counters
- **Featured Products**: Product showcase grid
- **News Section**: Latest company and industry news
- **Factory Showcase**: Manufacturing facility highlights
- **Strategic Partners**: Partner logo grid
- **Contact Information**: Footer with contact details

#### 2. Products Page (`/san-pham`)
- **Advanced Filtering**: Multi-level product filtering system
  - By animal type: Pig, Poultry, Cattle, Fish/Shrimp, Pets
  - By formulation: Injection, Solution, Powder, Tablets, External
  - By product type: Vaccines, Medications, Supplements, Parasitics, etc.
- **Product Grid**: Paginated product display (12-16 products per page)
- **Product Cards**: Image, title, description, "View Details" link
- **Contact Form**: Sidebar consultation request form

#### 3. News & Events (`/tin-tuc-su-kien`)
- **Categorized Content**: Company news vs Industry news
- **Article Grid**: Featured image, title, excerpt, date
- **Article Pages**: Full content with images and metadata

---

## Technical Implementation Plan

### Phase 1: Content Architecture Setup

#### Payload Collections Configuration

**1. Pages Collection**
```typescript
// pages.config.ts
export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
    { name: 'content', type: 'blocks', blocks: [
      HeroCarouselBlock,
      CompanyStoryBlock,
      StatisticsBlock,
      ProductShowcaseBlock,
      NewsBlock,
      FactoryBlock,
      PartnersBlock
    ]}
  ]
}
```

**2. Products Collection**
```typescript
// products.config.ts
export const Products: CollectionConfig = {
  slug: 'products',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'sku', type: 'text' },
    { name: 'description', type: 'richText' },
    { name: 'shortDescription', type: 'textarea' },
    { name: 'images', type: 'array', fields: [
      { name: 'image', type: 'upload', relationTo: 'media' }
    ]},
    { name: 'animalType', type: 'select', options: [
      { label: 'Heo (Pig)', value: 'pig' },
      { label: 'Gia cầm (Poultry)', value: 'poultry' },
      { label: 'Trâu bò (Cattle)', value: 'cattle' },
      { label: 'Tôm cá (Aquaculture)', value: 'aquaculture' },
      { label: 'Thú cưng (Pets)', value: 'pets' }
    ]},
    { name: 'formulation', type: 'select', options: [
      { label: 'Dạng tiêm (Injection)', value: 'injection' },
      { label: 'Dạng dung dịch (Solution)', value: 'solution' },
      { label: 'Dạng bột (Powder)', value: 'powder' },
      { label: 'Dạng viên (Tablets)', value: 'tablets' },
      { label: 'Dạng dùng ngoài (External)', value: 'external' }
    ]},
    { name: 'productType', type: 'select', options: [
      { label: 'Vaccine', value: 'vaccine' },
      { label: 'Thuốc thú y (Medication)', value: 'medication' },
      { label: 'Hỗ trợ điều trị (Supplement)', value: 'supplement' },
      { label: 'Ký sinh trùng (Parasitic)', value: 'parasitic' },
      { label: 'Bổ trợ (Support)', value: 'support' }
    ]},
    { name: 'featured', type: 'checkbox', defaultValue: false }
  ]
}
```

**3. News Collection**
```typescript
// news.config.ts
export const News: CollectionConfig = {
  slug: 'news',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
    { name: 'excerpt', type: 'textarea' },
    { name: 'content', type: 'richText' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'category', type: 'select', options: [
      { label: 'Tin Vinavetco', value: 'company' },
      { label: 'Tin ngành', value: 'industry' }
    ]},
    { name: 'publishedDate', type: 'date' },
    { name: 'featured', type: 'checkbox', defaultValue: false }
  ]
}
```

**4. Partners Collection**
```typescript
// partners.config.ts
export const Partners: CollectionConfig = {
  slug: 'partners',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media', required: true },
    { name: 'website', type: 'text' },
    { name: 'order', type: 'number' }
  ]
}
```

### Phase 2: Component Development

#### Layout Blocks Creation

**1. Hero Carousel Block**
```typescript
// blocks/HeroCarousel.ts
export const HeroCarousel: Block = {
  slug: 'heroCarousel',
  fields: [
    {
      name: 'slides',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'title', type: 'text' },
        { name: 'subtitle', type: 'text' },
        { name: 'link', type: 'link' }
      ]
    }
  ]
}
```

**2. Statistics Counter Block**
```typescript
// blocks/Statistics.ts
export const Statistics: Block = {
  slug: 'statistics',
  fields: [
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'number', type: 'text' }, // e.g., "50+"
        { name: 'label', type: 'text' },  // e.g., "Năm"
        { name: 'description', type: 'text' }
      ]
    }
  ]
}
```

**3. Product Showcase Block**
```typescript
// blocks/ProductShowcase.ts
export const ProductShowcase: Block = {
  slug: 'productShowcase',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'displayCount', type: 'number', defaultValue: 8 },
    { name: 'filterBy', type: 'select', options: [
      { label: 'Featured', value: 'featured' },
      { label: 'Latest', value: 'latest' },
      { label: 'Random', value: 'random' }
    ]}
  ]
}
```

**4. News Grid Block**
```typescript
// blocks/NewsGrid.ts
export const NewsGrid: Block = {
  slug: 'newsGrid',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'category', type: 'select', options: [
      { label: 'All', value: 'all' },
      { label: 'Company News', value: 'company' },
      { label: 'Industry News', value: 'industry' }
    ]},
    { name: 'displayCount', type: 'number', defaultValue: 6 }
  ]
}
```

### Phase 3: Frontend Implementation

#### Page Templates

**1. Homepage Layout**
```typescript
// app/(app)/page.tsx
export default async function HomePage() {
  const page = await getPage('home')

  return (
    <div className="min-h-screen">
      <RenderBlocks blocks={page.content} />
    </div>
  )
}
```

**2. Products Page with Filtering**
```typescript
// app/(app)/san-pham/page.tsx
export default async function ProductsPage({ searchParams }) {
  const { animalType, formulation, productType } = searchParams

  const products = await getProducts({
    where: {
      ...(animalType && { animalType: { equals: animalType } }),
      ...(formulation && { formulation: { equals: formulation } }),
      ...(productType && { productType: { equals: productType } })
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductFilters />
      <ProductGrid products={products} />
      <ProductPagination />
    </div>
  )
}
```

#### Component Development

**1. Hero Carousel Component**
```typescript
// components/blocks/HeroCarousel.tsx
'use client'
export function HeroCarousel({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image src={slide.image.url} alt={slide.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
            <div className="container mx-auto px-4 text-white">
              <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
              <p className="text-xl mb-8">{slide.subtitle}</p>
              {slide.link && (
                <Link href={slide.link.url} className="btn-primary">
                  {slide.link.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
```

**2. Statistics Counter Component**
```typescript
// components/blocks/Statistics.tsx
'use client'
export function Statistics({ stats }) {
  const [counters, setCounters] = useState(stats.map(() => 0))

  useEffect(() => {
    const timers = stats.map((stat, index) => {
      const target = parseInt(stat.number.replace(/\D/g, ''))
      const increment = target / 100
      let current = 0

      return setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timers[index])
        }
        setCounters(prev => {
          const newCounters = [...prev]
          newCounters[index] = Math.floor(current)
          return newCounters
        })
      }, 20)
    })

    return () => timers.forEach(clearInterval)
  }, [stats])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {counters[index]}{stat.number.replace(/^\d+/, '')}
          </div>
          <div className="text-lg font-semibold mb-2">{stat.label}</div>
          <div className="text-gray-600">{stat.description}</div>
        </div>
      ))}
    </div>
  )
}
```

### Phase 4: Styling & Theme

#### Tailwind Configuration
```typescript
// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

#### Global Styles
```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
}

.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors;
}

.btn-secondary {
  @apply bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors;
}
```

### Phase 5: Content Migration

#### Data Import Strategy

**1. Product Data Migration**
- Extract product information from vinavetco.com
- Map Vietnamese categories to English slugs
- Upload product images to Payload media library
- Create product records with proper categorization

**2. Content Pages**
- Recreate homepage layout using blocks
- Import company information and statistics
- Set up news categories and sample articles
- Configure partner logos and information

**3. Media Assets**
- Download and optimize hero images
- Extract product photos
- Obtain partner logos
- Create consistent image naming convention

### Phase 6: Advanced Features

#### Product Filtering System
```typescript
// lib/products.ts
export async function getFilteredProducts(filters: {
  animalType?: string
  formulation?: string
  productType?: string
  page?: number
  limit?: number
}) {
  const where: any = {}

  if (filters.animalType) where.animalType = { equals: filters.animalType }
  if (filters.formulation) where.formulation = { equals: filters.formulation }
  if (filters.productType) where.productType = { equals: filters.productType }

  return await payload.find({
    collection: 'products',
    where,
    limit: filters.limit || 12,
    page: filters.page || 1,
    sort: '-createdAt'
  })
}
```

#### SEO Optimization
```typescript
// lib/seo.ts
export function generateProductSEO(product: Product) {
  return {
    title: `${product.title} | Vinavetco`,
    description: product.shortDescription,
    image: product.images?.[0]?.image?.url,
    url: `/san-pham/${product.slug}`,
    type: 'product'
  }
}
```

### Phase 7: Testing & Deployment

#### Testing Strategy
- **Unit Tests**: Component functionality
- **Integration Tests**: API endpoints and data flow
- **E2E Tests**: User journeys (browsing, filtering, navigation)
- **Performance Tests**: Page load times and Core Web Vitals
- **Cross-browser Testing**: Chrome, Firefox, Safari, Edge

#### Deployment Checklist
- [ ] Environment variables configured
- [ ] Database connection established
- [ ] Media assets uploaded
- [ ] Content populated
- [ ] SEO meta tags configured
- [ ] Social media links updated
- [ ] Contact information verified
- [ ] SSL certificate installed
- [ ] Performance optimized

---

## Implementation Timeline

### Week 1-2: Foundation
- Set up Payload collections and blocks
- Create basic page layouts
- Implement hero carousel and statistics components
- Configure product filtering system

### Week 3-4: Content & Components
- Build product grid and detail components
- Implement news/blog system
- Create partner logo display
- Set up contact forms and information

### Week 5-6: Styling & Polish
- Apply Vinavetco branding and colors
- Ensure responsive design across devices
- Optimize images and performance
- Implement animations and interactions

### Week 7-8: Content Migration & Testing
- Import product catalog and content
- Test all user flows and functionality
- Performance optimization
- Cross-browser compatibility testing

---

## Success Metrics

### Functional Requirements
- [ ] Homepage loads within 3 seconds
- [ ] Product filtering works correctly
- [ ] All pages are mobile-responsive
- [ ] Contact forms function properly
- [ ] News articles display correctly

### Performance Targets
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Core Web Vitals: Good rating

### Content Completeness
- [ ] All product categories represented
- [ ] Company information accurately displayed
- [ ] News section populated with recent articles
- [ ] Partner logos and contact info updated

---

## Risk Mitigation

### Technical Risks
- **Performance**: Implement lazy loading and image optimization
- **SEO**: Use proper meta tags and structured data
- **Browser Compatibility**: Test across modern browsers
- **Mobile Experience**: Prioritize mobile-first design

### Content Risks
- **Data Accuracy**: Verify all product information
- **Image Quality**: Ensure high-resolution, optimized images
- **Legal Compliance**: Include proper disclaimers and certifications
- **Content Updates**: Establish process for ongoing content management

### Business Risks
- **Brand Consistency**: Maintain Vinavetco visual identity
- **User Experience**: Ensure intuitive navigation and clear CTAs
- **Load Times**: Optimize for Vietnamese internet speeds
- **Scalability**: Design for future product catalog growth

---

## Maintenance Plan

### Ongoing Tasks
- **Content Updates**: Regular product and news updates
- **Performance Monitoring**: Track Core Web Vitals
- **Security Updates**: Keep dependencies current
- **Backup Strategy**: Regular database and media backups

### Feature Enhancements
- **Search Functionality**: Advanced product search
- **User Accounts**: Customer login and order history
- **Multi-language**: English version support
- **Analytics**: User behavior tracking

This comprehensive plan provides a clear roadmap for recreating the Vinavetco frontend using Payload CMS, ensuring a professional, performant, and maintainable website that accurately represents their veterinary pharmaceutical business.
