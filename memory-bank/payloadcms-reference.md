# PayloadCMS Official Documentation Reference

**Last Updated**: November 5, 2025
**Source**: Official PayloadCMS Documentation (payloadcms.com/docs)
**Purpose**: Comprehensive reference for PayloadCMS features, configuration, and best practices

---

## Table of Contents
1. [What is Payload?](#what-is-payload)
2. [Core Concepts](#core-concepts)
3. [Configuration Overview](#configuration-overview)
4. [Collection Configuration](#collection-configuration)
5. [Quick Reference](#quick-reference)

---

## What is Payload?

**Payload is the Next.js fullstack framework.** Write a Payload Config and instantly get:

### Instant Backend Superpowers
- **Full Admin Panel**: React server/client components matching data shape, completely extensible
- **Database Schema**: Automatic schema with migrations, transactions, indexing
- **APIs**: Instant REST, GraphQL, and direct-to-DB Node.js APIs
- **Authentication**: Portable user accounts usable in external applications
- **Access Control**: Deeply customizable permission patterns
- **File Management**: Image cropping, focal point selection, media tools
- **Live Preview**: Real-time frontend rendering of content changes
- **Extensibility**: Full control over database, admin UI, and app logic

### Key Characteristics
- **Open Source**: MIT license, deploy anywhere (Vercel, self-hosted)
- **Code-First**: Everything version-controlled, no "click ops"
- **Fully Extensible**: Complete control with modern TypeScript/React

### Use Cases
1. **Headless CMS**: Content management with Live Preview, redirects, form builders
2. **Enterprise Tools**: Internal applications with SSO, access control, admin UI
3. **Headless Commerce**: Ecommerce with payment processors and storefront management
4. **Digital Asset Management**: File organization, versioning, bulk upload, access control

---

## Core Concepts

### Config
Central configuration object controlling database, admin panel, authentication, access control, localization, and more.

**Basic Structure**:
```typescript
import { buildConfig } from 'payload'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET,
  db: mongooseAdapter({ url: process.env.DATABASE_URI }),
  collections: [
    // Collections here
  ]
})
```

### Collections
Groups of records (Documents) sharing common schema. Stored in database based on defined Fields.

**Key Features**:
- Automatic Local API, REST API, GraphQL API generation
- Custom access control, hooks, admin options
- Support for authentication (auth collections)
- File uploads, versioning, timestamps

### Globals
Similar to Collections but contain single Documents. Used for site-wide settings.

### Fields
Building blocks defining Document schema and admin UI. 25+ field types available.

### Hooks
Execute custom logic during Document lifecycle events (before/after read, create, update, delete).

### Authentication
Secure, portable user management. Works in admin panel and external applications.

### Access Control
Determines user permissions for Documents and admin UI visibility.

### Admin Panel
Dynamically generated React interface for data/content management using Next.js App Router.

### APIs
Three API types sharing identical query language:

#### Local API
- Extremely fast, direct-to-database access
- No HTTP overhead
- Full TypeScript support
- Used in server components, hooks, custom routes

```typescript
import { getPayload } from 'payload'
const payload = await getPayload({ config })
const result = await payload.find({ collection: 'pages' })
```

#### REST API
- Standard HTTP endpoints at `/api`
- Automatic CRUD operations
- Supports all query parameters

```typescript
fetch('/api/pages')
  .then(res => res.json())
  .then(data => console.log(data))
```

#### GraphQL API
- Full GraphQL schema at `/api/graphql`
- GraphQL Playground at `/api/graphql-playground`
- Type-safe queries and mutations

---

## Configuration Overview

### Required Properties
- `secret`: Secure encryption key
- `db`: Database adapter (Postgres, MongoDB, SQLite, etc.)

### Key Configuration Options

| Option | Description |
|--------|-------------|
| `admin` | Admin panel configuration (components, live preview, etc.) |
| `collections` | Array of Collection configurations |
| `globals` | Array of Global configurations |
| `db` | Database adapter configuration |
| `serverURL` | Absolute app URL (protocol + domain + port) |
| `auth` | Authentication settings |
| `cors` | Cross-origin resource sharing |
| `localization` | Multi-language content support |
| `hooks` | Root-level hooks |
| `plugins` | Plugin configurations |
| `endpoints` | Custom API routes |
| `typescript` | TypeScript generation settings |
| `email` | Email adapter configuration |
| `upload` | Global upload settings |
| `routes` | URL routing configuration |
| `editor` | Rich text editor selection |
| `graphQL` | GraphQL-specific settings |
| `cookiePrefix` | Cookie naming prefix |
| `csrf` | CSRF protection domains |
| `defaultDepth` | Default relationship depth |
| `maxDepth` | Maximum query depth |
| `telemetry` | Anonymous usage tracking (default: enabled) |

### TypeScript Configuration
```typescript
typescript: {
  autoGenerate: true,        // Auto-generate types
  declare: true,            // Use generated types in Local API
  outputFile: './types.ts'  // Custom output path
}
```

### CORS Configuration
```typescript
cors: ['https://example.com']  // Whitelist domains
// OR
cors: {
  origins: ['https://example.com'],
  headers: ['x-custom-header']
}
// OR
cors: '*'  // Allow all origins
```

---

## Collection Configuration

### Basic Structure
```typescript
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'content', type: 'richText' }
  ]
}
```

### Key Properties

| Property | Description | Required |
|----------|-------------|----------|
| `slug` | Unique identifier | ✅ |
| `fields` | Schema definition | ✅ |
| `admin` | Admin panel options | ❌ |
| `access` | Access control functions | ❌ |
| `auth` | Authentication settings | ❌ |
| `hooks` | Lifecycle hooks | ❌ |
| `endpoints` | Custom API routes | ❌ |
| `upload` | File upload configuration | ❌ |
| `versions` | Draft/publish system | ❌ |
| `timestamps` | Auto-generated timestamps | ❌ |
| `defaultSort` | Default list sorting | ❌ |
| `labels` | Display labels | ❌ |
| `dbName` | Custom table name | ❌ |

### Admin Options
```typescript
admin: {
  group: 'Content',                    // Navigation grouping
  hidden: false,                       // Hide from navigation
  useAsTitle: 'title',                 // Document title field
  defaultColumns: ['title', 'status'], // List view columns
  description: 'Manage blog posts',    // List view description
  livePreview: { /* config */ },       // Live preview settings
  components: { /* custom components */ }
}
```

### Access Control
```typescript
access: {
  read: ({ req: { user } }) => user?.role === 'admin',
  create: ({ req: { user } }) => user?.role === 'editor',
  update: ({ req: { user }, id }) => user?.id === id,
  delete: ({ req: { user } }) => user?.role === 'admin'
}
```

### Authentication Collections
```typescript
auth: {
  tokenExpiration: 7200,      // 2 hours
  maxLoginAttempts: 5,
  lockTime: 600000,          // 10 minutes
  cookies: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
}
```

### Hooks
```typescript
hooks: {
  beforeChange: [(args) => { /* modify data */ }],
  afterChange: [(args) => { /* post-processing */ }],
  beforeRead: [(args) => { /* pre-processing */ }],
  afterRead: [(args) => { /* data transformation */ }]
}
```

### Versions (Drafts)
```typescript
versions: {
  drafts: true,              // Enable drafts
  max: 100,                  // Max versions to keep
  retainDeleted: false       // Keep versions after delete
}
```

### Upload Configuration
```typescript
upload: {
  staticURL: '/uploads',
  staticDir: 'uploads',
  mimeTypes: ['image/*'],
  imageSizes: [
    { name: 'thumbnail', width: 300, height: 300 }
  ]
}
```

### Custom Components
```typescript
admin: {
  components: {
    views: {
      List: CustomListView,
      Edit: CustomEditView
    },
    edit: {
      SaveButton: CustomSaveButton,
      PreviewButton: CustomPreviewButton
    }
  }
}
```

### Pagination
```typescript
admin: {
  pagination: {
    defaultLimit: 10,
    limits: [10, 25, 50, 100]
  }
}
```

### GraphQL Configuration
```typescript
graphQL: {
  singularName: 'Post',
  pluralName: 'Posts',
  disableQueries: false,
  disableMutations: false
}
```

---

## Quick Reference

### Common Field Types
- `text`: Single line text
- `textarea`: Multi-line text
- `richText`: Rich text editor
- `number`: Numeric values
- `email`: Email validation
- `date`: Date picker
- `checkbox`: Boolean values
- `select`: Dropdown options
- `radio`: Radio button group
- `relationship`: Link to other documents
- `upload`: File uploads
- `array`: Repeatable field groups
- `blocks`: Flexible content blocks
- `group`: Field grouping
- `tabs`: Tabbed field organization

### Database Adapters
- `@payloadcms/db-postgres`: PostgreSQL
- `@payloadcms/db-vercel-postgres`: Vercel Postgres
- `@payloadcms/db-mongodb`: MongoDB
- `@payloadcms/db-sqlite`: SQLite (development)

### Package Structure
- `payload`: Core business logic, Local API
- `@payloadcms/next`: Admin panel, HTTP layer, REST/GraphQL APIs
- `@payloadcms/ui`: Reusable admin components
- `@payloadcms/db-*`: Database adapters
- `@payloadcms/richtext-*`: Rich text editors

### Environment Variables
- `PAYLOAD_SECRET`: Encryption key
- `DATABASE_URL`: Database connection
- `PAYLOAD_CONFIG_PATH`: Custom config location
- `NEXT_PUBLIC_SERVER_URL`: Public app URL

### CLI Commands
- `pnpm payload generate:types`: Generate TypeScript types
- `pnpm payload migrate`: Run database migrations
- `pnpm payload migrate:create`: Create migration files
- `pnpm payload seed`: Seed database with sample data

### File Structure Best Practices
```
src/
├── collections/     # Collection configurations
├── globals/        # Global configurations
├── fields/         # Custom field definitions
├── blocks/         # Layout blocks
├── components/     # Custom admin components
├── endpoints/      # Custom API routes
├── hooks/          # Custom hooks
├── access/         # Access control functions
└── utilities/      # Helper functions
```

### Performance Tips
- Use `forceSelect` for fields needed in hooks/access control
- Enable `enableListViewSelectAPI` for large collections
- Index frequently queried fields
- Use `defaultDepth` appropriately for relationships
- Implement proper caching strategies

### Security Best Practices
- Always use HTTPS in production
- Implement proper CORS settings
- Use strong `PAYLOAD_SECRET`
- Configure CSRF protection
- Set appropriate access controls
- Validate file uploads
- Use secure cookie settings

---

**Note**: This reference covers core PayloadCMS concepts and configuration. For detailed field documentation, API references, and advanced features, refer to the official PayloadCMS documentation at [payloadcms.com/docs](https://payloadcms.com/docs).

**Version**: Based on PayloadCMS 3.62.1 documentation
