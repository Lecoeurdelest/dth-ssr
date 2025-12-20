# Next.js Migration - Modular Monolithic Architecture Proposal

## Current Codebase Analysis

### Current Structure (React Router + Vite)
```
src/
├── app/
│   ├── App.tsx (Router setup)
│   ├── components/ (Mixed: feature + shared)
│   ├── contexts/ (UserContext, ChatContext)
│   ├── data/ (Mock data)
│   └── pages/ (11 pages)
├── assets/ (Images)
└── styles/ (CSS files)
```

### Identified Features/Modules

1. **Home** - Landing page with hero, about, services preview, testimonials
2. **Auth** - Login, Register pages
3. **Services** - Services listing, service detail, booking modals
4. **News** - News/articles listing and detail view
5. **Contact** - Contact form and information
6. **Orders** - Order history, order details, invoices
7. **Profile** - User profile management
8. **Tasks** - Dashboard/tasks page (multi-tab: profile, orders, promotions)
9. **Loyalty** - Loyalty points page
10. **Chat** - Chat functionality (context + component)
11. **Layout** - Header, Footer, FloatingContact (shared layout components)

### Current Routing
- `/` - HomePage
- `/services` - ServicesPage
- `/services/:serviceId` - ServiceDetailPage
- `/news` - NewsPage
- `/contact` - ContactPage
- `/tasks` - TasksPage
- `/login` - LoginPage
- `/register` - RegisterPage
- `/profile` - ProfilePage
- `/orders` - OrderHistoryPage
- `/loyalty-points` - LoyaltyPointsPage

---

## Proposed Next.js Modular Monolithic Architecture

### Target Structure

```
project-root/
├── app/                          # Next.js App Router (routing only)
│   ├── layout.tsx               # Root layout (Header, Footer, providers)
│   ├── page.tsx                 # Home page
│   ├── services/
│   │   ├── page.tsx            # Services listing
│   │   └── [serviceId]/
│   │       └── page.tsx        # Service detail
│   ├── news/
│   │   ├── page.tsx            # News listing
│   │   └── [articleId]/
│   │       └── page.tsx        # Article detail (if needed)
│   ├── contact/
│   │   └── page.tsx            # Contact page
│   ├── tasks/
│   │   └── page.tsx            # Tasks/Dashboard page
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── register/
│   │   └── page.tsx            # Register page
│   ├── profile/
│   │   └── page.tsx            # Profile page
│   ├── orders/
│   │   └── page.tsx            # Order history
│   └── loyalty-points/
│       └── page.tsx            # Loyalty points
│
├── modules/                      # Feature modules (strict boundaries)
│   ├── home/
│   │   ├── components/         # Home-specific components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── ProfessionalTeamSection.tsx
│   │   │   ├── ServiceCategories.tsx
│   │   │   └── ServiceWorkerSelector.tsx
│   │   ├── hooks/              # Home-specific hooks
│   │   └── index.ts            # Public API
│   │
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts      # Auth logic (from UserContext)
│   │   ├── types/
│   │   │   └── user.types.ts
│   │   └── index.ts
│   │
│   ├── services/
│   │   ├── components/
│   │   │   ├── ServiceGrid.tsx
│   │   │   ├── ServiceDetailView.tsx
│   │   │   ├── ServicePricingTabs.tsx
│   │   │   ├── BookServiceModal.tsx
│   │   │   ├── ServiceDetailModal.tsx
│   │   │   └── ServiceWorkerSelector.tsx
│   │   ├── hooks/
│   │   │   ├── useServices.ts
│   │   │   └── useServiceDetail.ts
│   │   ├── api/
│   │   │   └── services.api.ts  # Move servicesData here
│   │   ├── types/
│   │   │   └── service.types.ts
│   │   └── index.ts
│   │
│   ├── news/
│   │   ├── components/
│   │   │   └── NewsArticleCard.tsx (if extracted)
│   │   ├── hooks/
│   │   │   └── useNews.ts
│   │   ├── api/
│   │   │   └── news.api.ts     # Mock news data
│   │   ├── types/
│   │   │   └── news.types.ts
│   │   └── index.ts
│   │
│   ├── contact/
│   │   ├── components/
│   │   │   └── ContactSection.tsx
│   │   ├── hooks/
│   │   │   └── useContact.ts
│   │   └── index.ts
│   │
│   ├── orders/
│   │   ├── components/
│   │   │   ├── OrderCard.tsx
│   │   │   ├── OrderDetailModal.tsx
│   │   │   └── InvoicePreviewModal.tsx
│   │   ├── hooks/
│   │   │   └── useOrders.ts
│   │   ├── api/
│   │   │   └── orders.api.ts   # Move ordersData here
│   │   ├── types/
│   │   │   └── order.types.ts
│   │   └── index.ts
│   │
│   ├── profile/
│   │   ├── components/
│   │   │   └── ProfileForm.tsx (if extracted)
│   │   ├── hooks/
│   │   │   └── useProfile.ts
│   │   └── index.ts
│   │
│   ├── tasks/
│   │   ├── components/
│   │   │   └── TasksDashboard.tsx (if extracted)
│   │   ├── hooks/
│   │   │   └── useTasks.ts
│   │   └── index.ts
│   │
│   ├── loyalty/
│   │   ├── components/
│   │   │   └── LoyaltyPointsView.tsx (if extracted)
│   │   ├── hooks/
│   │   │   └── useLoyalty.ts
│   │   └── index.ts
│   │
│   └── chat/
│       ├── components/
│       │   └── ChatBox.tsx
│       ├── hooks/
│       │   └── useChat.ts      # From ChatContext
│       ├── types/
│       │   └── chat.types.ts
│       └── index.ts
│
├── shared/                       # Shared, domain-agnostic code
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── FloatingContact.tsx
│   │   ├── ui/                  # shadcn/ui components (keep as-is)
│   │   │   └── [all ui components]
│   │   └── ImageWithFallback.tsx
│   ├── hooks/
│   │   └── [shared hooks]
│   ├── utils/
│   │   └── [utility functions]
│   └── types/
│       └── [shared types]
│
├── lib/                          # Application-level config
│   ├── config.ts
│   └── http-client.ts            # HTTP abstraction (if needed)
│
├── public/
│   └── images/                   # Static assets
│
└── styles/                       # Global styles
    ├── globals.css
    └── [other css files]
```

---

## Migration Strategy

### Phase 1: Next.js Setup & Configuration
1. Initialize Next.js project with TypeScript
2. Configure Tailwind CSS
3. Set up path aliases
4. Migrate global styles
5. Create root layout structure

### Phase 2: Shared Infrastructure
1. Move `shared/components/ui/` (shadcn components)
2. Move `shared/components/layout/` (Header, Footer, FloatingContact)
3. Move `shared/components/ImageWithFallback.tsx`
4. Set up providers in root layout

### Phase 3: Module Extraction (Feature by Feature)
1. **Home Module** - Extract home components and hooks
2. **Auth Module** - Extract auth logic from UserContext
3. **Services Module** - Extract services components, data, types
4. **News Module** - Extract news components and data
5. **Contact Module** - Extract contact components
6. **Orders Module** - Extract orders components and data
7. **Profile Module** - Extract profile components
8. **Tasks Module** - Extract tasks components
9. **Loyalty Module** - Extract loyalty components
10. **Chat Module** - Extract chat from context to module

### Phase 4: Route Migration
1. Convert React Router routes to Next.js App Router
2. Create page.tsx files in app/ directory
3. Update all imports to use module boundaries
4. Test all routes

### Phase 5: Finalization
1. Remove old React Router code
2. Clean up unused files
3. Verify UI preservation
4. Test build and runtime

---

## Module Boundary Rules

### ✅ Allowed
- Modules can import from `shared/`
- Modules can import from `lib/`
- App routes can import from modules via `modules/{module}/index.ts`
- Modules can have internal imports within themselves

### ❌ Forbidden
- Direct imports between modules (e.g., `modules/services` → `modules/orders`)
- App routes importing module internals (e.g., `modules/services/components/...`)
- Shared importing from modules
- Deep imports (always use module's `index.ts`)

---

## Key Decisions

1. **Context Migration**: Convert React Contexts to module hooks
   - `UserContext` → `modules/auth/hooks/useAuth.ts`
   - `ChatContext` → `modules/chat/hooks/useChat.ts`

2. **Data Migration**: Move mock data to module `api/` folders
   - `data/servicesData.ts` → `modules/services/api/services.api.ts`
   - `data/ordersData.ts` → `modules/orders/api/orders.api.ts`

3. **Component Organization**:
   - Feature-specific components → Module `components/`
   - Layout components → `shared/components/layout/`
   - Generic UI components → `shared/components/ui/`

4. **Type Safety**: Extract types to module `types/` folders

5. **UI Preservation**: 
   - Keep all JSX structure identical
   - Keep all Tailwind classes identical
   - Keep all component hierarchies identical
   - Only refactor internal organization

---

## Next Steps

1. Review and approve this architecture
2. Begin Phase 1: Next.js setup
3. Proceed incrementally through each phase
4. Test after each module migration

