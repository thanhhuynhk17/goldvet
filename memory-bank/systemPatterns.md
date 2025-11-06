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

These patterns provide a solid foundation for maintaining consistency, performance, and developer productivity across the entire Goldvet platform.
