# Technical Context: Goldvet Ecommerce Platform

## Technology Stack

### Core Framework & Runtime
- **Next.js 15.5.4**: React framework with App Router for modern web applications
- **Node.js 18.20.2+**: JavaScript runtime environment
- **TypeScript 5.7.2**: Type-safe JavaScript with strict type checking

### Content Management System
- **Payload CMS 3.62.1**: Headless CMS with admin panel and API
- **PostgreSQL**: Primary database with Payload's db-postgres adapter
- **Database Migrations**: Version-controlled schema changes

### Frontend & Styling
- **React 19.0.0**: UI library for component-based development
- **Tailwind CSS 4.0.12**: Utility-first CSS framework
- **shadcn/ui**: Pre-built accessible UI components
- **Radix UI**: Unstyled, accessible component primitives
- **Lucide React**: Icon library for consistent UI elements
- **Roboto Font**: Google Fonts typeface optimized for Vietnamese character support

### Payments & Commerce
- **Stripe 18.5.0**: Payment processing and financial operations
- **@stripe/react-stripe-js**: React components for Stripe Elements
- **@stripe/stripe-js**: Stripe.js library for client-side integration

### Development & Build Tools
- **pnpm**: Fast, disk-efficient package manager
- **ESLint 9.16.0**: Code linting with Next.js configuration
- **Prettier 3.4.2**: Code formatting with Tailwind plugin
- **TypeScript Compiler**: Type checking and compilation

### Testing Infrastructure
- **Vitest 3.2.3**: Fast unit testing framework
- **Playwright 1.50.0**: End-to-end testing with browser automation
- **@testing-library/react**: React component testing utilities
- **jsdom**: DOM simulation for testing

### Media & Assets
- **Sharp 0.34.2**: High-performance image processing
- **Next.js Image Optimization**: Built-in responsive images
- **Payload Media Collections**: File upload and management

### Additional Libraries
- **React Hook Form 7.54.1**: Form state management and validation
- **Zod**: Schema validation (via Payload)
- **Date-fns 4.1.0**: Modern date utility library
- **Sonner**: Toast notifications
- **Embla Carousel**: Touch-friendly carousels
- **Prism React Renderer**: Syntax highlighting for code blocks
- **Framer Motion 11.11.17**: Animation library for interactive UI elements

### Hero System Architecture
- **Admin-Editable Heroes**: Hero sections managed through PayloadCMS admin interface
- **Rich Text Content**: Title and description extracted from Payload rich text fields
- **Client-Side Rendering**: Hero components marked with `'use client'` for framer-motion compatibility
- **Unified Content**: Same hero content shared across `/gioi-thieu`, `/bai-viet`, and `/cua-hang` pages
- **Custom Styling**: Green gradient backgrounds with image overlays and motion animations
- **Animation Reset Pattern**: Search params-based component re-mounting for consistent animations
- **Immediate Animation Playback**: `animate="visible"` instead of `whileInView` for reliable triggering

### Server Actions (Next.js 13+)
- **Server Actions**: Direct server-side code execution from client components
- **Standard Pattern**: All client component data fetching uses Server Actions instead of client-side fetch
- **Benefits**: Better performance, type safety, cleaner architecture

### Consolidated Rendering System
- **RenderBlocks Component**: Unified component that handles both hero blocks and layout blocks
- **Hero Block Detection**: Identifies hero blocks by `type` property vs layout blocks by `blockType` property
- **Type Safety**: Proper TypeScript types for mixed block rendering
- **Performance**: Single rendering pass for all page content

### Block-Based Architecture Updates

#### StoreLayout Block
- **Purpose**: Advanced store page with filtering and search capabilities
- **Admin Fields**: Title, subtitle, filters, search, ratings, pagination controls
- **Client Component**: Uses Framer Motion for animations and interactive filtering
- **Data Fetching**: PayloadCMS actions with proper error handling and loading states
- **Features**: Real-time search, category filtering, animal type filtering, formulation filtering

#### Enhanced ProductShowcase Block
- **Converted**: From server component to client component to support Framer Motion
- **Features**: Same design as StoreLayout with ratings, badges, and hover effects
- **Animations**: Staggered product card animations with fade-in effects
- **Call-to-Action**: Links to full store page with professional styling
- **Loading States**: Skeleton loading with proper UX during data fetching

#### Client Component Block Patterns
```typescript
// Pattern: Client component blocks with data fetching
'use client'
export const BlockName: React.FC<Props> = ({ ... }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await getDataAction({...})
        setData(result.docs)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [dependencies])

  // Loading state
  if (loading) return <SkeletonLoader />

  // Error state
  if (error) return <ErrorMessage error={error} />

  // Success state with Framer Motion
  return (
    <motion.div initial="hidden" whileInView="visible" variants={animations}>
      {/* Render content */}
    </motion.div>
  )
}
```

#### Block Registration Pattern
```typescript
// In Pages collection blocks array
blocks: [
  StoreLayout,      // New advanced store block
  ProductShowcase,  // Enhanced with client features
  // ... other blocks
]
```

#### NewsArticle Block
- **Purpose**: Flexible news article display with admin-configurable options
- **Features**: Category badges, publication dates, excerpts, featured images, back-to-news links
- **Admin Fields**: Checkboxes for display options, customizable link text/URLs
- **Migration**: Converted from hardcoded components to block-based system
- **Implementation**: Receives news data as props, renders with configurable display options

#### Seed Data with Block Configuration
```typescript
// cua-hang page seed data
layout: [{
  blockType: 'storeLayout',
  blockName: 'Store Layout',
  title: 'Sản phẩm',
  subtitle: 'Giải pháp dược phẩm thú y toàn diện',
  displayFilters: true,
  enableSearch: true,
  showRatings: true,
  itemsPerPage: 12,
  sortBy: 'createdAt'
}]

// News article default layout
layout: [{
  blockType: 'newsArticle',
  blockName: 'News Article',
  showCategory: true,
  showDate: true,
  showExcerpt: true,
  showFeaturedImage: true,
  backToNewsText: '← Quay lại bài viết',
  backToNewsUrl: '/bai-viet'
}]
```

## Development Environment Setup

### Prerequisites
- **Node.js**: Version 18.20.2 or higher
- **pnpm**: Package manager (recommended)
- **PostgreSQL**: Database server (local or cloud)
- **Git**: Version control

### Local Development
```bash
# Clone and setup
git clone <repository>
cd goldvet
cp .env.example .env
# Configure database connection in .env
pnpm install
pnpm dev
```

### Environment Variables
- **DATABASE_URL**: PostgreSQL connection string
- **PAYLOAD_SECRET**: Payload CMS encryption key
- **NEXT_PUBLIC_SERVER_URL**: Application base URL
- **STRIPE_SECRET_KEY**: Stripe secret key
- **STRIPE_PUBLISHABLE_KEY**: Stripe publishable key
- **STRIPE_WEBHOOK_SECRET**: Stripe webhook endpoint secret

## Technical Architecture

### Application Structure
```
src/
├── app/                 # Next.js App Router pages
├── collections/         # Payload CMS data collections
├── components/          # Reusable React components
├── blocks/             # Layout builder blocks
├── fields/             # Custom Payload fields
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── providers/          # React context providers
├── utilities/          # Helper functions
└── globals/            # Payload global configurations
```

### Database Schema
- **Users**: Authentication with admin/customer roles
- **Products**: Catalog items with variants and pricing
- **Orders**: Purchase transactions and fulfillment
- **Carts**: Shopping cart persistence
- **Pages**: Content-managed pages with layout builder
- **Media**: File uploads and image management

## Deployment & Production

### Supported Platforms
- **Vercel**: Recommended for Next.js applications
- **Docker**: Containerized deployment
- **Self-hosted**: Traditional server deployment

### Build Process
```bash
pnpm build    # Production build
pnpm start    # Production server
```

### Database Considerations
- **Development**: Local PostgreSQL with schema pushing
- **Production**: Managed PostgreSQL with migrations
- **Backup**: Regular automated backups required

## Technical Constraints & Limitations

### Framework Limitations
- **Next.js App Router**: Requires modern Node.js versions
- **React 19**: Latest features may have ecosystem lag
- **TypeScript Strict**: Requires disciplined type definitions

### Payload CMS Constraints
- **Schema Changes**: Require migration scripts in production
- **Version Control**: Draft/published content workflow
- **Access Control**: Role-based permissions system

### Performance Considerations
- **Image Optimization**: Large catalogs require CDN integration
- **Database Queries**: Complex product filtering needs indexing
- **Bundle Size**: Rich component library impacts initial load

### Security Requirements
- **Payment Processing**: PCI compliance through Stripe
- **Data Protection**: GDPR/CCPA compliance for user data
- **API Security**: Proper authentication and authorization
- **Environment Secrets**: Secure credential management

## Technical Debt & Known Issues

### Next.js 15 Migration Debt

**Issue**: Multiple pages currently use `export const dynamic = 'force-dynamic'` to work around Next.js 15's `searchParams` Promise requirement.

**Affected Pages**:
- `src/app/(app)/page.tsx` (homepage)
- `src/app/(app)/[slug]/page.tsx` (catch-all pages)
- `src/app/(app)/checkout/page.tsx`
- `src/app/(app)/forgot-password/page.tsx`
- `src/app/(app)/logout/page.tsx`
- `src/app/(app)/shop/page.tsx`
- `src/app/(app)/tin-tuc/[slug]/page.tsx`

**Impact**:
- ❌ Prevents static generation for these pages
- ❌ Reduces performance (no caching benefits)
- ❌ Impacts SEO (server-side rendering instead of static)
- ❌ Increases server load and response times

**Root Cause**: Next.js 15 changed `searchParams` from synchronous to asynchronous (Promise), breaking static generation for pages that use it directly or through components.

**Solution Needed**:
- Wrap `useSearchParams()` calls in `<Suspense>` boundaries
- Move searchParams logic to client components with proper Suspense
- Implement proper loading states for dynamic content
- Test static generation compatibility

**Priority**: Medium - Performance optimization for production deployment.

### Client Component Requirements

**Issue**: Next.js 15 requires explicit client component marking for components using browser APIs.

**Components Affected**:
- `src/heros/RenderHero.tsx` - Uses `useSearchParams()` for animation reset
- All hero components using Framer Motion - Require `'use client'` directive

**Solution Implemented**:
- Added `'use client'` directive to components using React hooks
- Ensures proper client-side rendering for interactive components
- Prevents Next.js compilation errors during development

**Best Practice**: Always mark components with `'use client'` when they use:
- React hooks (`useState`, `useEffect`, `usePathname`, `useSearchParams`)
- Browser APIs (`window`, `document`, `localStorage`)
- Third-party libraries requiring client-side execution (Framer Motion)

## Development Workflow

### Code Quality
- **ESLint**: Automated code linting
- **Prettier**: Consistent code formatting
- **TypeScript**: Compile-time type checking
- **Testing**: Unit and E2E test coverage

### Git Workflow
- **Branching**: Feature branches with PR reviews
- **Commits**: Conventional commit messages
- **Releases**: Semantic versioning

### CI/CD Pipeline
- **Automated Testing**: Run tests on every push
- **Build Verification**: Ensure production builds succeed
- **Deployment**: Automated deployment on merge to main

This technical foundation provides a robust, scalable platform for ecommerce while maintaining developer productivity and code maintainability.
