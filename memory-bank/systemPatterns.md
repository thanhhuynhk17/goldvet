# System Patterns: Goldvet Ecommerce Platform

## System Architecture

### Overall Architecture Pattern
**Monolithic Application with Headless CMS**
- Single Next.js application serving both frontend and admin interface
- Payload CMS integrated as the data layer and admin panel
- Shared database and business logic between storefront and admin

### Application Layers
```
┌─────────────────┐
│   Frontend UI   │  Next.js Pages & Components
├─────────────────┤
│  Business Logic │  Payload Collections & Hooks
├─────────────────┤
│   Data Access   │  Payload API & Database
├─────────────────┤
│   Persistence   │  PostgreSQL Database
└─────────────────┘
```

## Key Technical Decisions

### 1. Payload CMS Integration
**Decision**: Use Payload as the primary data management and admin interface layer
**Rationale**:
- Provides complete admin panel out-of-the-box
- Handles authentication, access control, and API generation
- Supports content relationships and complex data structures
- Active community and regular updates

**Implications**:
- All data operations go through Payload's API
- Admin interface is automatically generated
- Schema changes require Payload migration system

### 2. Next.js App Router
**Decision**: Use Next.js 15 App Router for all routing and page management
**Rationale**:
- Modern React patterns with Server Components
- Built-in SEO optimization and performance features
- Native support for API routes and middleware
- Excellent developer experience with TypeScript

**Implications**:
- Server Components for data fetching and initial rendering
- Client Components only where interactivity is needed
- Route groups for organizing admin vs public routes

### 3. Component Architecture
**Decision**: shadcn/ui + Radix UI for consistent, accessible components
**Rationale**:
- Pre-built, customizable components reduce development time
- Accessibility built-in by default
- Consistent design system across the application
- Tailwind CSS integration for styling

**Implications**:
- All UI components follow the same patterns
- Customization through Tailwind classes and CSS variables
- Component library updates managed through npm

## Design Patterns

### 1. Collection-Based Data Modeling
**Pattern**: Payload Collections as primary data entities
```typescript
// Example: Product Collection Structure
export const Products: CollectionConfig = {
  slug: 'products',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'richText' },
    { name: 'variants', type: 'array', fields: [...] },
    { name: 'categories', type: 'relationship', relationTo: 'categories' }
  ]
}
```

**Usage**: All major data entities (Users, Products, Orders, etc.) are defined as Payload collections with consistent field patterns.

### 2. Layout Builder Pattern
**Pattern**: Block-based page composition using Payload's layout builder
```typescript
// Block registration in Payload config
blocks: [
  HeroBlock,
  ContentBlock,
  ProductGridBlock,
  CallToActionBlock
]
```

**Usage**: Pages are composed of reusable blocks that can be arranged by content editors without developer intervention.

### 3. Access Control Pattern
**Pattern**: Role-based access control with collection-level permissions
```typescript
// Access control functions
export const adminOnly = ({ req: { user } }) => {
  return user?.role === 'admin'
}

export const customerOwner = ({ req: { user }, id }) => {
  return user?.id === id || user?.role === 'admin'
}
```

**Usage**: Applied consistently across all collections to enforce data security and user permissions.

### 4. Server State Management
**Pattern**: Server Components with selective client hydration
```typescript
// Server Component for data fetching
export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug)
  return <ProductClient product={product} />
}

// Client Component for interactivity
'use client'
export function ProductClient({ product }) {
  const [selectedVariant, setSelectedVariant] = useState()
  // Interactive logic here
}
```

**Usage**: Server Components handle data fetching and initial rendering, Client Components manage user interactions.

### 5. Form Management Pattern
**Pattern**: React Hook Form with Payload integration
```typescript
export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    await fetch('/api/form-submissions', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} />
      {errors.email && <span>Email is required</span>}
    </form>
  )
}
```

**Usage**: Consistent form handling across the application with validation and error management.

### 6. Auto-scroll Carousel Pattern
**Pattern**: Embla Carousel with auto-scroll plugin and hover navigation
```typescript
// Auto-scroll carousel with hover controls
<Carousel
  opts={{ align: 'start', loop: true }}
  plugins={[
    AutoScroll({
      playOnInit: true,
      speed: 1,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  ]}
>
  {/* Carousel content */}
</Carousel>

// Hidden navigation arrows that appear on hover
<div className="group">
  <CarouselPrevious className="opacity-0 group-hover:opacity-100" />
  <CarouselNext className="opacity-0 group-hover:opacity-100" />
</div>
```

**Usage**: Product carousels with smooth auto-scroll and intuitive hover controls.

### 7. Server Actions Pattern
**Pattern**: Next.js Server Actions for client component data fetching
```typescript
// Server action in src/actions/products.ts
'use server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function getProductsByCategory(category?: string, limit: number = 12) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'products',
    where: { _status: { equals: 'published' } },
    limit
  })
  return { success: true, data: result.docs }
}

// Client component using server action
'use client'
export function ProductSection() {
  const [products, setProducts] = useState([])
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      const result = await getProductsByCategory(activeCategory)
      if (result.success) {
        setProducts(result.data)
      }
    })
  }, [activeCategory])

  return isPending ? <Spinner /> : <ProductCarousel products={products} />
}
```

**Usage**: **STANDARD APPROACH** for all client component data fetching. Server Actions provide better performance, type safety, and cleaner architecture than client-side fetch calls.

## Component Relationships

### Core Component Hierarchy
```
App (Root Layout)
├── Header (Global navigation)
├── Main Content
│   ├── Page-specific Components
│   │   ├── Hero Section
│   │   ├── Product Grid
│   │   ├── Content Blocks
│   │   └── Call-to-Action
│   └── Shared Components
│       ├── Cart Sidebar
│       ├── Search Modal
│       └── User Menu
└── Footer (Global footer)
```

### Block System Architecture
```
Layout Builder
├── Hero Block
│   ├── High Impact Hero
│   ├── Medium Impact Hero
│   └── Low Impact Hero
├── Content Block
│   ├── Rich Text Editor
│   └── Media Embed
├── Product Blocks
│   ├── Product Grid
│   ├── Product Item
│   └── Product Filters
├── Interactive Blocks
│   ├── Form Block
│   ├── Carousel Block
│   └── Call-to-Action Block
└── Utility Blocks
    ├── Banner Block
    └── Archive Block
```

## Critical Implementation Paths

### 1. Product Purchase Flow
```
Product Page → Add to Cart → Cart Review → Checkout → Payment → Order Confirmation
     ↓             ↓             ↓           ↓          ↓           ↓
   Product       Cart API     Cart Page   Checkout   Stripe     Order
   Collection    Updates      Display    Form       Payment   Creation
```

### 2. Content Management Flow
```
Admin Panel → Collection Edit → Save Draft → Publish → Frontend Revalidation
     ↓              ↓              ↓          ↓              ↓
   Payload UI    Form Fields   Versioning  Status       ISR
   Components    Validation    System     Update      Cache
```

### 3. User Authentication Flow
```
Login Form → Payload Auth → User Session → Protected Routes → User Data Access
     ↓           ↓             ↓              ↓               ↓
   Form        API Call      JWT Token    Middleware     Access
   Validation  Endpoint      Storage      Checks       Control
```

## Data Flow Patterns

### 1. Read Operations
- **Static Generation**: ISR for product pages and content
- **Server Components**: Direct Payload API calls for initial data
- **Client Hydration**: Selective client-side data fetching for dynamic content

### 2. Write Operations
- **Form Submissions**: Payload API mutations through form handlers
- **Admin Operations**: Direct Payload admin panel interactions
- **Background Jobs**: Payload jobs queue for scheduled publishing

### 3. Real-time Updates
- **Live Preview**: Payload's live preview system for content editing
- **Revalidation**: Next.js on-demand revalidation for content updates
- **Webhooks**: Stripe webhooks for payment status updates

## Error Handling Patterns

### 1. API Error Handling
```typescript
try {
  const result = await payload.find({ collection: 'products' })
  return result
} catch (error) {
  console.error('Failed to fetch products:', error)
  return { docs: [], totalDocs: 0 }
}
```

### 2. Form Validation
- Client-side validation with React Hook Form
- Server-side validation through Payload field validation
- User-friendly error messages with consistent styling

### 3. Payment Error Handling
- Stripe error categorization and user messaging
- Failed payment recovery flows
- Transaction logging for debugging

## Performance Optimization Patterns

### 1. Image Optimization
- Next.js Image component with automatic optimization
- Payload media collections with size variants
- Lazy loading for below-the-fold images

### 2. Database Query Optimization
- Selective field queries to reduce payload size
- Relationship depth control for complex data
- Database indexing for frequently queried fields

### 3. Caching Strategy
- Next.js ISR for static content
- Payload's built-in caching for API responses
- CDN integration for media assets

### 8. User Roles Field Pattern
**Pattern**: Multi-select roles field with deduplication and proper defaults
```typescript
// Users collection roles field configuration
{
  name: 'roles',
  type: 'select',
  hasMany: true,
  required: true,
  hooks: {
    beforeChange: [
      // Set default customer role for new users
      ({ value, operation }) => {
        if (operation === 'create' && (!value || value.length === 0)) {
          return ['customer']
        }
        return value
      },
      ensureFirstUserIsAdmin,
      // Ensure no duplicate roles (prevents React key errors)
      ({ value }) => {
        if (Array.isArray(value)) {
          return [...new Set(value)]
        }
        return value
      }
    ],
  },
  options: [
    { label: 'Admin', value: 'admin' },
    { label: 'Customer', value: 'customer' },
  ],
}
```

**Usage**: Prevents duplicate role values that cause "admin-admin" React key errors in the admin panel. Ensures clean data integrity for user role management.

### 9. Server/Client Component Separation Pattern
**Pattern**: Separate server components (data fetching) from client components (interactivity) to avoid Next.js runtime errors
```typescript
// Server Component - handles data fetching
export async function Footer() {
  const footer = await getCachedGlobal('footer', 1)() // Server-side data fetching

  return (
    <footer>
      {/* Static content */}
      <FooterClient
        showBackToTop={footer.footerSettings?.showBackToTop}
        copyrightText={footer.footerSettings?.copyrightText}
      />
    </footer>
  )
}

// Client Component - handles interactivity
'use client'
export function FooterClient({ showBackToTop, copyrightText }: Props) {
  return (
    <div>
      {showBackToTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ↑ Back to top
        </button>
      )}
      <p>{copyrightText}</p>
    </div>
  )
}
```

**Usage**: **STANDARD APPROACH** for components that need both server-side data fetching and client-side interactivity. Prevents "Event handlers cannot be passed to Client Component props" runtime errors in Next.js 13+ App Router. Server components handle data fetching, client components handle user interactions.

### 10. Consolidated Block Rendering Pattern
**Pattern**: Unified rendering system that handles both hero blocks and layout blocks in a single component
```typescript
// RenderBlocks component handles both hero and layout blocks
export const RenderBlocks: React.FC<{
  blocks: (Page['layout'][0] | Page['hero'])[]
}> = (props) => {
  const { blocks } = props

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
            return (
              <div className="my-16" key={index}>
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

// Page component combines hero and layout blocks
export default async function GioiThieuPage() {
  const page = await getGioiThieuPage()
  const { hero, layout } = page

  // Combine hero and layout blocks for unified rendering
  const allBlocks = hero && hero.type !== 'none' ? [hero, ...layout] : layout

  return (
    <article className="pt-16 pb-24">
      <RenderBlocks blocks={allBlocks} />
    </article>
  )
}
```

**Usage**: **STANDARD APPROACH** for page rendering that combines hero sections and layout blocks. Eliminates the need for separate `RenderHero` and `RenderBlocks` components, providing a cleaner and more maintainable architecture. Hero blocks are identified by the presence of a `type` property, while layout blocks use the `blockType` property.

### 11. Dedicated Page Route Pattern
**Pattern**: Create dedicated routes for important pages instead of relying on dynamic slug routing
```typescript
// Dedicated route structure for important pages
src/app/(app)/
├── gioi-thieu/          # Dedicated about page
│   └── page.tsx         # Server component with data fetching
├── cua-hang/            # Dedicated store page
│   └── page.tsx         # Server component with data fetching
├── bai-viet/            # Dedicated news/blog section
│   ├── page.tsx         # News listing page
│   └── [slug]/
│       └── page.tsx     # Individual news article
└── [slug]/              # Catch-all for other CMS pages
    └── page.tsx         # Dynamic slug routing fallback
```

**Usage**: **RECOMMENDED APPROACH** for high-traffic or SEO-critical pages. Dedicated routes provide better performance (static generation), cleaner URLs, and improved SEO compared to dynamic slug routing. Use dynamic slug routing only as a fallback for less critical pages.

### 12. Hero Section Admin Integration Pattern
**Pattern**: Make hero sections editable through PayloadCMS admin with custom styling and consistent content across pages
```typescript
// Hero section with admin-editable rich text content
export const LowImpactHero: React.FC<LowImpactHeroType> = ({ richText }) => {
  // Extract title and description from Payload rich text
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
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className="relative py-20 px-4 overflow-hidden"
    >
      {/* Custom green gradient background with image overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800 opacity-95"></div>
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center mix-blend-overlay opacity-20"></div>

      <div className="relative max-w-7xl mx-auto text-center text-white">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">{description}</p>
        </motion.div>
      </div>
    </motion.section>
  )
}
```

**Usage**: **STANDARD APPROACH** for hero sections across the website. Provides consistent branding, admin-editable content, and custom styling. Hero content is managed through PayloadCMS admin interface, allowing non-technical users to update titles and descriptions without code changes.

### 13. Server Actions Extension Pattern
**Pattern**: Extend Server Actions pattern to client components for dynamic content fetching with proper loading states
```typescript
// Server action for AboutPage data fetching
'use server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function getGioiThieuPage() {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'gioi-thieu' } },
    depth: 2,
  })

  return page.docs[0] || null
}

// Client component using server action with loading states
'use client'
export function AboutPageClient({ page }: { page: any }) {
  const [gioiThieuData, setGioiThieuData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGioiThieuPage()
        setGioiThieuData(data)
      } catch (error) {
        console.error('Failed to fetch gioi thieu data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Render dynamic content */}
      {gioiThieuData && <DynamicContentRenderer data={gioiThieuData} />}
    </motion.div>
  )
}
```

**Usage**: **EXTENDED APPROACH** for client components that need server-side data fetching. Provides proper loading states, error handling, and smooth animations. Extends the Server Actions pattern to handle dynamic content updates in interactive components.

### 14. Unified Hero Content Pattern
**Pattern**: Use identical hero content across multiple pages for consistent branding and messaging
```typescript
// Seed data with identical hero content for multiple pages
const heroContent = {
  type: 'lowImpact',
  richText: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          children: [{ type: 'text', text: 'Giới thiệu - Goldvet', version: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          tag: 'h1',
          version: 1,
        },
        {
          type: 'paragraph',
          children: [{
            type: 'text',
            text: 'Hơn 50 năm tiên phong trong lĩnh vực dược phẩm thú y, mang đến những giải pháp chăm sóc sức khỏe động vật toàn diện',
            version: 1
          }],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  },
}

// Apply same hero to multiple pages
export const gioiThieuData = () => ({
  slug: 'gioi-thieu',
  hero: heroContent,
  layout: [/* About page blocks */],
})

export const baiVietData = () => ({
  slug: 'bai-viet',
  hero: heroContent, // Same hero content
  layout: [/* News grid blocks */],
})

export const cuaHangData = () => ({
  slug: 'cua-hang',
  hero: heroContent, // Same hero content
  layout: [/* Product section blocks */],
})
```

**Usage**: **STANDARD APPROACH** for maintaining consistent branding across key pages. Provides unified messaging and visual identity while allowing different page layouts. Hero content can be updated once in the admin panel and will reflect across all pages using this pattern.

### 15. Hero Animation Reset Pattern
**Pattern**: Force hero component re-mounting on navigation to reset Framer Motion animations
```typescript
// RenderHero component with search params-based key for animation reset
'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}
  const searchParams = useSearchParams()

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  // Key changes with search params, forcing re-mount on navigation/filter changes
  return <HeroToRender key={searchParams.toString()} {...props} />
}
```

**Usage**: **CRITICAL FIX** for hero animations during client-side navigation. Forces component re-mounting when search parameters change, ensuring animations reset on page navigation and filter interactions. Solves the issue where `whileInView` animations don't trigger during programmatic navigation.

### 16. Immediate Hero Animation Pattern
**Pattern**: Use `animate` instead of `whileInView` for immediate animation playback on mount
```typescript
// LowImpactHero with immediate animation on mount
export const LowImpactHero: React.FC<LowImpactHeroType> = ({ richText, media }) => {
  return (
    <motion.section
      initial="hidden"
      animate="visible"  // ← Triggers immediately on mount
      variants={fadeInUp}
      className="relative py-20 px-4 overflow-hidden"
    >
      {/* Hero content */}
    </motion.section>
  )
}
```

**Usage**: **STANDARD APPROACH** for hero animations that must play on every page load. Eliminates dependency on viewport detection (`whileInView`) which fails during client-side navigation. Ensures animations play immediately when components mount, providing consistent user experience across all navigation scenarios.

### 17. Client-Side Filtering Pattern
**Pattern**: Implement smooth filtering without page refreshes using client-side state management and URL synchronization
```typescript
// Client component with local state management
'use client'
export function NewsPageClient({ initialArticles, initialCategory, initialPage }) {
  const [category, setCategory] = useState(initialCategory)
  const [articles, setArticles] = useState(initialArticles)
  const [isPending, startTransition] = useTransition()

  // Update URL without causing navigation
  const updateURL = (newCategory, newPage) => {
    const url = new URL(window.location.href)
    if (newCategory !== 'all') {
      url.searchParams.set('category', newCategory)
    } else {
      url.searchParams.delete('category')
    }
    if (newPage > 1) {
      url.searchParams.set('page', newPage.toString())
    } else {
      url.searchParams.delete('page')
    }
    window.history.pushState({}, '', url.pathname + url.search)
  }

  // Fetch data with loading states
  const fetchArticles = (newCategory, newPage) => {
    startTransition(async () => {
      const result = await getNews({ category: newCategory, page: newPage })
      setArticles(result.docs)
      setCategory(newCategory)
      updateURL(newCategory, newPage)
    })
  }

  // Handle filter changes
  const handleCategoryChange = (newCategory) => {
    if (newCategory === category) return
    fetchArticles(newCategory, 1) // Reset to page 1
  }

  // Browser navigation support
  useEffect(() => {
    const handlePopState = () => {
      const url = new URL(window.location.href)
      const urlCategory = url.searchParams.get('category') || 'all'
      const urlPage = parseInt(url.searchParams.get('page') || '1')

      if (urlCategory !== category || urlPage !== currentPage) {
        fetchArticles(urlCategory, urlPage)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [category, currentPage])

  return (
    <div>
      {/* Filter buttons with loading states */}
      <button
        onClick={() => handleCategoryChange('all')}
        disabled={isPending}
        className={cn('px-6 py-3 rounded-full font-medium transition-colors disabled:opacity-50',
          category === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        )}
      >
        Tất cả bài viết
      </button>

      {/* Content with loading indicators */}
      {isPending ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <NewsGrid articles={articles} />
      )}
    </div>
  )
}
```

**Usage**: **STANDARD APPROACH** for implementing smooth filtering experiences. Eliminates page refreshes, provides loading states, maintains SEO-friendly URLs, and supports browser navigation. Used for both news category filtering and product filtering across the application.

### 18. Dual-Mode Component Pattern
**Pattern**: Create components that support both router-based (legacy) and client-side filtering modes
```typescript
// ProductFilters component supporting both modes
interface ProductFiltersProps {
  initialFilters: {
    animalType?: string
    formulation?: string
    productType?: string
    searchValue?: string
  }
  onFilterChange?: (filters: typeof initialFilters) => void  // Client-side mode
  isLoading?: boolean
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  initialFilters,
  onFilterChange,
  isLoading = false
}) => {
  const router = useRouter()

  const updateFilters = (key: string, value: string) => {
    if (onFilterChange) {
      // Client-side filtering mode
      const newFilters = { ...initialFilters }
      if (key === 'q') {
        newFilters.searchValue = value || undefined
      } else {
        newFilters[key] = value || undefined
      }
      onFilterChange(newFilters)
    } else {
      // Legacy router-based filtering mode
      const url = new URL(window.location.href)
      if (value) {
        url.searchParams.set(key, value)
      } else {
        url.searchParams.delete(key)
      }
      router.push(url.pathname + url.search)
    }
  }

  return (
    <div className="mb-8 bg-gray-50 p-6 rounded-lg">
      {/* Filter controls */}
      <select
        value={initialFilters.animalType || ''}
        onChange={(e) => updateFilters('animalType', e.target.value)}
        disabled={isLoading}
      >
        <option value="">Tất cả</option>
        <option value="pig">Heo (Pig)</option>
        <option value="poultry">Gia cầm (Poultry)</option>
      </select>
    </div>
  )
}
```

**Usage**: **STANDARD APPROACH** for filter components that need to work in multiple contexts. Supports both immediate client-side filtering (with callbacks) and traditional page-based filtering (with router navigation). Provides backward compatibility while enabling modern user experiences.

### 19. Hero Animation Pathname-Based Reset Pattern
**Pattern**: Reset hero animations only on actual page navigation, not filter interactions
```typescript
// RenderHero with pathname-based key (fixed version)
'use client'
export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}
  const pathname = usePathname()  // ← Use pathname instead of searchParams

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  // Key changes only with pathname, not search params
  // Prevents hero refresh when interacting with filters
  return <HeroToRender key={pathname} {...props} />
}
```

**Usage**: **CRITICAL FIX** for hero animation issues during client-side filtering. Ensures hero animations only restart when users navigate to different pages, not when they interact with filters on the same page. Solves the jarring hero refresh problem introduced by client-side filtering implementations.

### 20. PayloadCMS Direct Data Fetching Pattern
**Pattern**: Use Payload Local API directly in server actions for optimal performance and type safety
```typescript
// Server action using Payload Local API directly
'use server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getProducts(filters: {
  animalType?: string
  formulation?: string
  productType?: string
  searchValue?: string
  limit?: number
  sort?: string
}) {
  const payload = await getPayload({ config: configPromise })

  // Build where clause dynamically
  const where: any = {
    _status: { equals: 'published' }
  }

  if (filters.animalType) {
    where.animalType = { equals: filters.animalType }
  }

  if (filters.formulation) {
    where.formulation = { equals: filters.formulation }
  }

  if (filters.productType) {
    where.productType = { equals: filters.productType }
  }

  if (filters.searchValue) {
    where.or = [
      { title: { like: filters.searchValue } },
      { description: { like: filters.searchValue } }
    ]
  }

  // Execute query with Payload Local API
  const result = await payload.find({
    collection: 'products',
    where,
    sort: filters.sort || '-createdAt',
    limit: filters.limit || 12,
    select: {
      id: true,
      title: true,
      slug: true,
      gallery: true,
      animalType: true,
      formulation: true,
      productType: true
    }
  })

  return {
    docs: result.docs,
    totalDocs: result.totalDocs,
    totalPages: result.totalPages,
    page: result.page,
    hasNextPage: result.page < result.totalPages
  }
}

// Client component calling server action
'use client'
export function ProductList() {
  const [products, setProducts] = useState([])

  const loadProducts = async (filters) => {
    const result = await getProducts(filters) // Direct server action call
    setProducts(result.docs)
  }

  return (
    <div>
      {/* Product list */}
    </div>
  )
}
```

**Key Benefits:**
- ✅ **Type Safety**: Full TypeScript support with generated Payload types
- ✅ **Performance**: Direct database queries without HTTP overhead
- ✅ **Consistency**: Same API pattern across all data fetching
- ✅ **Caching**: Automatic request deduplication and caching
- ✅ **Security**: Built-in access control and validation

**Usage**: **STANDARD APPROACH** for all data fetching in PayloadCMS projects. Use Payload Local API directly in server actions instead of creating custom API routes. This provides optimal performance, type safety, and maintainability.

**When to use `revalidatePath()`:**
```typescript
'use server'
import { revalidatePath } from 'next/cache'

export async function createProduct(data: Product) {
  const payload = await getPayload({ config: configPromise })
  await payload.create({ collection: 'products', data })

  // Invalidate cache for product pages
  revalidatePath('/cua-hang')
  revalidatePath('/cua-hang/[slug]', 'page')
}
```

**Usage**: Call `revalidatePath()` after mutations to ensure fresh data. Use specific paths or 'page' for dynamic routes.

## Block Usage by Page

### **Complete Block-First Architecture Analysis**

#### **✅ Block-First Pages (Fully Implemented)**

**1. Homepage (`/`)**</parameter>
- **Route**: `src/app/(app)/page.tsx`
- **Blocks Used**:
  - `heroCarousel` - Rotating banner with 4 veterinary slides
  - `aboutSection` - Company story section
  - `achievements` - Statistics counters (50+ years, 600+ products, etc.)
  - `statistics` - Company metrics display
  - `productShowcase` - Featured veterinary products
  - `newsGrid` - Latest news articles
- **Implementation**: `RenderBlocks` with `homeStaticData()`

**2. About Page (`/gioi-thieu`)**
- **Route**: `src/app/(app)/[slug]/page.tsx` (dynamic routing)
- **Blocks Used**:
  - `aboutPage` - Comprehensive company information block
- **Implementation**: Dynamic slug routing with `RenderBlocks` + `RenderHero`

**3. Contact Page (`/lien-he`)**
- **Route**: `src/app/(app)/[slug]/page.tsx` (dynamic routing)
- **Blocks Used**:
  - `formBlock` - Contact form with validation
  - `content` - Company contact information
- **Implementation**: Dynamic slug routing with `RenderBlocks` + `RenderHero`

#### **🔄 Dedicated Page Component Pages (Complex Filtering)**

**4. News Listing (`/bai-viet`)**
- **Route**: `src/app/(app)/[slug]/page.tsx` (dynamic routing)
- **Components**: `NewsPage` + `NewsPageClient` + `NewsGridPagination`
- **Features**: Category filtering, pagination, URL state management
- **Implementation**: Dedicated page component with client-side filtering

**5. Store Page (`/cua-hang`)**
- **Route**: `src/app/(app)/[slug]/page.tsx` (dynamic routing)
- **Components**: `StorePage` + `StorePageClient`
- **Features**: Product filtering by animal type, URL state management
- **Implementation**: Dedicated page component with client-side filtering (mirrors bai-viet)

#### **📄 Individual Content Pages**

**6. Product Detail Pages (`/cua-hang/[slug]`)**
- **Route**: `src/app/(app)/cua-hang/[slug]/page.tsx`
- **Blocks Used**:
  - `productDetail` - Individual product information
- **Implementation**: Dedicated route with block rendering

**7. News Article Pages (`/bai-viet/[slug]`)**
- **Route**: `src/app/(app)/bai-viet/[slug]/page.tsx`
- **Blocks Used**:
  - `newsArticle` - Article content with configurable display options
- **Implementation**: Dedicated route with `RenderBlocks` + `RenderHero`

#### **Block Architecture Benefits**
- ✅ **Admin Editable**: All content managed through Payload CMS
- ✅ **Consistent Styling**: Unified design system across all pages
- ✅ **Flexible Layout**: Content editors can modify page structure
- ✅ **Reusable Components**: Blocks work across different contexts
- ✅ **Type Safe**: Full TypeScript support with generated types
- ✅ **Performance**: Optimized rendering with proper hydration

#### **Block Registration Status**
All blocks are properly registered in:
- `src/blocks/RenderBlocks.tsx` - Frontend rendering
- `src/payload.config.ts` - Admin panel configuration
- Collection schemas - For page-specific blocks

#### **Migration Status**
- **Before**: News articles used hardcoded components
- **After**: News articles use `newsArticle` block with full admin control
- **Result**: 100% block-first architecture across all content pages

These patterns provide a solid foundation for maintaining consistency, performance, and developer productivity across the entire Goldvet platform.
