# Route Decision Table

## Analysis Date
Based on original project scope: `repomix-output-Home Page Design.zip.md`

**Decision Criteria:**
- Design intent (user navigation flow)
- URL shareability
- Browser history support
- SEO considerations
- Authentication requirements

---

## Route Decisions

| Screen/Feature | Type | Route | Rationale |
|----------------|------|-------|------------|
| **HomePage** | Full Page | `/` | Primary landing page, shareable URL |
| **ServicesPage** | Full Page | `/services` | Service listing, shareable, SEO-friendly |
| **ServiceDetailPage** | Full Page | `/services/:serviceId` | Individual service detail, shareable, SEO-friendly, dynamic route |
| **NewsPage** | Full Page | `/news` | News listing, shareable, SEO-friendly |
| **ContactPage** | Full Page | `/contact` | Contact information, shareable |
| **TasksPage** | Full Page | `/tasks` | Dashboard, requires auth, tabbed interface |
| **LoginPage** | Full Page | `/auth/login` | Authentication flow, separate from `/login` for clarity |
| **RegisterPage** | Full Page | `/auth/register` | Authentication flow, separate from `/register` for clarity |
| **ProfilePage** | Full Page | `/profile` | User profile, requires auth, shareable (if public profiles) |
| **OrderHistoryPage** | Full Page | `/orders` | Order management, requires auth |
| **LoyaltyPointsPage** | Full Page | `/loyalty-points` | Loyalty program, requires auth |

---

## UI States - Routing Decision

| UI State | Type | Route Decision | Rationale |
|----------|------|----------------|-----------|
| **BookServiceModal** | Modal | No route | Modal overlay, not shareable, temporary state |
| **ServiceDetailModal** | Modal | No route | Quick preview, not shareable |
| **OrderDetailModal** | Modal | No route | Detail view, not shareable, nested in orders page |
| **InvoicePreviewModal** | Modal | No route | PDF preview, nested in order detail |
| **ReviewModal** | Modal | No route | Form submission, temporary state |
| **WorkerSelectionModal** | Modal | No route | Selection interface, temporary state |
| **ChatBox** | Floating | No route | Always available, global component |
| **FloatingContact** | Floating | No route | Always available, global component |
| **TasksPage Tabs** | Tab State | No route (or query param) | Internal navigation, could use query param `/tasks?tab=orders` for shareability |
| **LoginPage Tabs** | Tab State | No route | Form input method, temporary state |
| **Profile Edit Mode** | Toggle | No route | Edit state, temporary |
| **Order Filter** | Filter State | Query param (optional) | Could use `/orders?status=completed` for shareability |

---

## Route Grouping by Module

### Home Module
- `/` → HomePage

### Services Module
- `/services` → ServicesPage
- `/services/:serviceId` → ServiceDetailPage

### News Module
- `/news` → NewsPage

### Contact Module
- `/contact` → ContactPage

### Auth Module
- `/auth/login` → LoginPage
- `/auth/register` → RegisterPage

### Profile Module
- `/profile` → ProfilePage

### Orders Module
- `/orders` → OrderHistoryPage

### Tasks Module
- `/tasks` → TasksPage (with internal tabs)

### Loyalty Module
- `/loyalty-points` → LoyaltyPointsPage

---

## Authentication Requirements

| Route | Auth Required | Redirect If Not Authenticated |
|-------|---------------|-------------------------------|
| `/` | No | - |
| `/services` | No | - |
| `/services/:serviceId` | No | - |
| `/news` | No | - |
| `/contact` | No | - |
| `/auth/login` | No | - |
| `/auth/register` | No | - |
| `/tasks` | Yes | Redirect to `/auth/login` |
| `/profile` | Yes | Redirect to `/` or `/auth/login` |
| `/orders` | Yes | Redirect to `/auth/login` |
| `/loyalty-points` | Yes | Redirect to `/auth/login` |

---

## Route Aliases (Optional)

For backward compatibility or user convenience:

- `/login` → `/auth/login` (redirect)
- `/register` → `/auth/register` (redirect)

---

## Query Parameters (Optional Enhancements)

### TasksPage
- `/tasks?tab=profile` - Direct link to profile tab
- `/tasks?tab=orders` - Direct link to orders tab
- `/tasks?tab=promotions` - Direct link to promotions tab

### OrderHistoryPage
- `/orders?status=completed` - Filter by status
- `/orders?status=pending` - Filter by status

### ServiceDetailPage
- `/services/:serviceId?section=pricing` - Scroll to pricing section
- `/services/:serviceId?section=reviews` - Scroll to reviews section

---

## Route Hierarchy

```
/ (Home)
├── /services (Services Listing)
│   └── /services/:serviceId (Service Detail)
├── /news (News Listing)
├── /contact (Contact)
├── /auth (Authentication)
│   ├── /auth/login (Login)
│   └── /auth/register (Register)
└── /[authenticated] (Requires Auth)
    ├── /tasks (Dashboard)
    ├── /profile (Profile)
    ├── /orders (Order History)
    └── /loyalty-points (Loyalty Points)
```

---

## Notes

1. **Modals are NOT routes:** All modals are UI states, not separate routes. They are triggered by user actions and do not appear in browser history.

2. **Tab states:** TasksPage tabs could optionally use query parameters for shareability, but are not required routes.

3. **Authentication flow:** Login and Register are grouped under `/auth/*` for better organization and clarity.

4. **Service detail:** Dynamic route `/services/:serviceId` allows for shareable service URLs and SEO.

5. **No nested routes:** All pages are top-level routes. No nested routing structure needed.

6. **Floating components:** ChatBox and FloatingContact are global components, not routes.

