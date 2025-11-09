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

### Server Actions (Next.js 13+)
- **Server Actions**: Direct server-side code execution from client components
- **Standard Pattern**: All client component data fetching uses Server Actions instead of client-side fetch
- **Benefits**: Better performance, type safety, cleaner architecture

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
