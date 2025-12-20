# Module Scope Lock

## Analysis Date
Based on original project scope: `repomix-output-Home Page Design.zip.md`

**Purpose:** Define strict boundaries for each feature module based on design intent.

---

## Module Definitions

### 1. Home Module
**Scope:** Landing page and home-specific content

**Screens:**
- HomePage (full page)

**Routes:**
- `/` → HomePage

**Components:**
- HeroSection
- AboutSection
- ServiceCategories
- ServiceWorkerSelector
- TestimonialsSection
- WorkerSelectionModal (triggered from ServiceWorkerSelector)

**Shared Dependencies:**
- Header (shared layout)
- Footer (shared layout)
- FloatingContact (shared global)
- ChatBox (shared global)
- useChat hook (shared)

**Boundaries:**
- ✅ Can link to `/services`, `/news`, `/contact`
- ❌ Cannot contain service detail logic
- ❌ Cannot contain order management
- ❌ Cannot contain authentication logic

**Notes:** WorkerSelectionModal is part of Home module as it's triggered from ServiceWorkerSelector on the home page.

---

### 2. Services Module
**Scope:** Service listing and service detail pages

**Screens:**
- ServicesPage (full page)
- ServiceDetailPage (full page)

**Routes:**
- `/services` → ServicesPage
- `/services/:serviceId` → ServiceDetailPage

**Components:**
- ServiceGrid (if used)
- ServiceCategories
- ServiceWorkerSelector
- ProfessionalTeamSection
- ServicePricingTabs
- BookServiceModal (triggered from ServiceDetailPage)
- WorkerSelectionModal (triggered from ServiceWorkerSelector)

**Shared Dependencies:**
- Header (shared layout)
- Footer (shared layout)
- FloatingContact (shared global)
- ChatBox (shared global)
- ImageWithFallback (shared UI)

**Boundaries:**
- ✅ Can display service information
- ✅ Can trigger booking flow (modal)
- ❌ Cannot contain order management
- ❌ Cannot contain authentication logic
- ❌ Cannot contain user profile logic

**Notes:** BookServiceModal is part of Services module as it's triggered from ServiceDetailPage.

---

### 3. News Module
**Scope:** News and articles listing

**Screens:**
- NewsPage (full page)

**Routes:**
- `/news` → NewsPage

**Components:**
- News listing components
- Featured article component

**Shared Dependencies:**
- Header (shared layout)
- Footer (shared layout)
- FloatingContact (shared global)
- ChatBox (shared global)
- ImageWithFallback (shared UI)

**Boundaries:**
- ✅ Can display news articles
- ❌ Cannot contain service logic
- ❌ Cannot contain order logic
- ❌ Cannot contain authentication logic

**Notes:** Simple content module, no complex interactions.

---

### 4. Contact Module
**Scope:** Contact information and communication

**Screens:**
- ContactPage (full page)

**Routes:**
- `/contact` → ContactPage

**Components:**
- ContactSection

**Shared Dependencies:**
- Header (shared layout)
- Footer (shared layout)
- FloatingContact (shared global)
- ChatBox (shared global - used here)

**Boundaries:**
- ✅ Can display contact information
- ✅ Can trigger chat (via ChatBox)
- ❌ Cannot contain service booking
- ❌ Cannot contain order management
- ❌ Cannot contain authentication logic

**Notes:** ChatBox is a shared global component, but ContactPage is where it's primarily used.

---

### 5. Auth Module
**Scope:** Authentication and user registration

**Screens:**
- LoginPage (full page)
- RegisterPage (full page)

**Routes:**
- `/auth/login` → LoginPage
- `/auth/register` → RegisterPage

**Components:**
- Login form
- Register form
- Social login buttons
- Login method tabs (username/email/phone)
- Password visibility toggles

**Shared Dependencies:**
- useAuth hook (shared)
- UI components (shared)

**Boundaries:**
- ✅ Can handle authentication
- ✅ Can redirect after login/register
- ❌ Cannot contain service logic
- ❌ Cannot contain order logic
- ❌ Cannot contain profile management (only initial registration)

**Notes:** Standalone authentication flow, no Header/Footer layout.

---

### 6. Profile Module
**Scope:** User profile management

**Screens:**
- ProfilePage (full page)

**Routes:**
- `/profile` → ProfilePage

**Components:**
- Profile header
- Profile information form
- Edit mode toggle
- Loyalty points card (link to loyalty page)

**Shared Dependencies:**
- Header (shared layout)
- Footer (shared layout)
- FloatingContact (shared global)
- ChatBox (shared global)
- useAuth hook (shared)

**Boundaries:**
- ✅ Can manage user profile information
- ✅ Can link to loyalty points page
- ❌ Cannot contain order management
- ❌ Cannot contain service booking
- ❌ Cannot contain authentication logic (only uses auth state)

**Notes:** Requires authentication. Links to Loyalty module but does not contain loyalty logic.

---

### 7. Orders Module
**Scope:** Order history and order management

**Screens:**
- OrderHistoryPage (full page)

**Routes:**
- `/orders` → OrderHistoryPage

**Components:**
- OrderCard
- OrderDetailModal
- InvoicePreviewModal
- ReviewModal
- ReviewList
- Status filter buttons
- Statistics cards

**Shared Dependencies:**
- Header (shared layout)
- Footer (shared layout)
- FloatingContact (shared global)
- ChatBox (shared global)
- useAuth hook (shared)
- ImageWithFallback (shared UI)

**Boundaries:**
- ✅ Can display order history
- ✅ Can show order details
- ✅ Can handle order reviews
- ✅ Can show invoices
- ❌ Cannot contain service booking
- ❌ Cannot contain profile management
- ❌ Cannot contain authentication logic (only uses auth state)

**Notes:** Requires authentication. Contains nested modals (OrderDetailModal → InvoicePreviewModal, ReviewModal).

---

### 8. Tasks Module
**Scope:** User dashboard with tabbed interface

**Screens:**
- TasksPage (full page)

**Routes:**
- `/tasks` → TasksPage

**Components:**
- Tab navigation (profile, orders, promotions)
- Profile tab content
- Orders tab content
- Promotions tab content
- OrderDetailModal (triggered from orders tab)
- Edit mode toggle (for profile tab)

**Shared Dependencies:**
- Header (shared layout)
- Footer (shared layout)
- FloatingContact (shared global)
- ChatBox (shared global)
- useAuth hook (shared)
- OrderCard (from Orders module - shared component)

**Boundaries:**
- ✅ Can display profile information (tab)
- ✅ Can display orders (tab)
- ✅ Can display promotions (tab)
- ❌ Cannot contain full profile management (only tab view)
- ❌ Cannot contain full order management (only tab view)
- ❌ Cannot contain authentication logic (only uses auth state)

**Notes:** 
- Requires authentication.
- This is a dashboard that aggregates content from Profile and Orders modules.
- Should reuse components from Profile and Orders modules where possible.
- Tabs are internal navigation, not separate routes.

---

### 9. Loyalty Module
**Scope:** Loyalty points and promotion program

**Screens:**
- LoyaltyPointsPage (full page)

**Routes:**
- `/loyalty-points` → LoyaltyPointsPage

**Components:**
- Points header
- Current tier badge
- Points history list
- Promotion tiers table
- Next tier progress

**Shared Dependencies:**
- Header (shared layout)
- Footer (shared layout)
- FloatingContact (shared global)
- ChatBox (shared global)
- useAuth hook (shared)

**Boundaries:**
- ✅ Can display loyalty points
- ✅ Can show promotion tiers
- ✅ Can show points history
- ❌ Cannot contain order management
- ❌ Cannot contain profile management
- ❌ Cannot contain authentication logic (only uses auth state)

**Notes:** Requires authentication. Linked from ProfilePage but is a separate module.

---

## Shared Components

### Layout Components
- **Header** - Navigation and user menu
- **Footer** - Company info and links
- **FloatingContact** - Floating contact buttons (global)

### Global Components
- **ChatBox** - Customer support chat (global)
- **ImageWithFallback** - Image component with fallback

### Shared Hooks
- **useAuth** - Authentication state and methods
- **useChat** - Chat state and methods

### Shared UI Components
- All components in `src/app/components/ui/` (button, input, dialog, etc.)

---

## Module Interaction Rules

### Allowed Cross-Module Links
- ✅ Home → Services, News, Contact
- ✅ Services → ServiceDetail
- ✅ Profile → Loyalty Points
- ✅ Any page → Login/Register (if not authenticated)
- ✅ Any page → Contact

### Forbidden Cross-Module Logic
- ❌ Services module cannot directly access Orders module logic
- ❌ Profile module cannot directly access Orders module logic
- ❌ Orders module cannot directly access Services module booking logic
- ❌ Auth module cannot access any other module's business logic

### Shared State Management
- ✅ useAuth hook - shared across all authenticated modules
- ✅ useChat hook - shared across all modules
- ❌ No shared state for orders, services, or profile (each module manages its own)

---

## Module Structure Template

Each module should follow this structure:

```
modules/
  {module-name}/
    {ModulePage}.tsx          # Entry point (if single page)
    components/                # Module-specific components
      Component1.tsx
      Component2.tsx
    hooks/                     # Module-specific hooks
      useModuleHook.ts
    api/                       # Module-specific API calls
      moduleApi.ts
    types/                     # Module-specific types
      module.types.ts
    index.ts                   # Public API
```

**Public API (index.ts) should only export:**
- Page components (entry points)
- Public hooks (if needed by other modules)
- Public types (if needed by other modules)

**Do NOT export:**
- Internal components
- Internal hooks
- Internal utilities

---

## Notes

1. **Tasks Module Special Case:** TasksPage is a dashboard that aggregates content from Profile and Orders modules. It should reuse components from those modules rather than duplicating logic.

2. **Modal Ownership:** Modals belong to the module that triggers them, not separate modules.

3. **Shared Components:** Layout and global components are in `shared/`, not in modules.

4. **Authentication:** Auth module handles authentication flow. Other modules only consume auth state via `useAuth` hook.

5. **No Deep Imports:** Modules should not import from other modules' internal components. Only use public APIs.

