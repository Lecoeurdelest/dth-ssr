# Design Pages Map

## Analysis Date
Based on original project scope: `repomix-output-Home Page Design.zip.md`

---

## Full Pages (11)

### 1. HomePage
- **Route:** `/`
- **Type:** Full Page
- **Layout:** Standard (Header + Footer)
- **Components:**
  - HeroSection
  - AboutSection
  - ServiceCategories
  - ServiceWorkerSelector
  - TestimonialsSection
- **UI States:** None
- **Notes:** Landing page with multiple sections

---

### 2. ServicesPage
- **Route:** `/services`
- **Type:** Full Page
- **Layout:** Standard (Header + Footer)
- **Components:**
  - ProfessionalTeamSection
  - ServiceCategories
  - ServiceWorkerSelector
- **UI States:** None
- **Notes:** Services listing page

---

### 3. ServiceDetailPage
- **Route:** `/services/:serviceId`
- **Type:** Full Page
- **Layout:** Standard (Header + Footer)
- **Components:**
  - Service header image
  - Service title and rating
  - ServicePricingTabs
  - Service commitments
  - Service images gallery
  - Service video (if available)
  - Customer reviews section
- **UI States:**
  - BookServiceModal (triggered by "Đặt dịch vụ" button)
  - Expandable categories (accordion-style)
- **Notes:** Dynamic route based on serviceId

---

### 4. NewsPage
- **Route:** `/news`
- **Type:** Full Page
- **Layout:** Standard (Header + Footer)
- **Components:**
  - Featured article section
  - News articles grid/list
- **UI States:** None
- **Notes:** News/articles listing page

---

### 5. ContactPage
- **Route:** `/contact`
- **Type:** Full Page
- **Layout:** Standard (Header + Footer)
- **Components:**
  - ContactSection
- **UI States:**
  - ChatBox (floating, always available)
- **Notes:** Contact information and form

---

### 6. TasksPage
- **Route:** `/tasks`
- **Type:** Full Page
- **Layout:** Standard (Header + Footer)
- **Components:**
  - Tab navigation (profile, orders, promotions)
  - Profile tab content
  - Orders tab content
  - Promotions tab content
- **UI States:**
  - Tab switching: 'profile' | 'orders' | 'promotions'
  - Edit mode toggle (for profile)
  - OrderDetailModal (triggered from orders tab)
- **Notes:** Dashboard-style page with tabbed interface

---

### 7. LoginPage
- **Route:** `/login`
- **Type:** Full Page
- **Layout:** Full-screen (no Header/Footer visible)
- **Components:**
  - Logo header
  - Social login buttons
  - Login method tabs
  - Login form
- **UI States:**
  - Login method tabs: 'username' | 'email' | 'phone'
  - Password visibility toggle
- **Notes:** Standalone authentication page

---

### 8. RegisterPage
- **Route:** `/register`
- **Type:** Full Page
- **Layout:** Full-screen (no Header/Footer visible)
- **Components:**
  - Logo header
  - Social registration buttons
  - Multi-section registration form
- **UI States:**
  - Password visibility toggle
  - Confirm password visibility toggle
  - Verification method radio: 'email' | 'phone'
- **Notes:** Standalone registration page

---

### 9. ProfilePage
- **Route:** `/profile`
- **Type:** Full Page
- **Layout:** Standard (Header + Footer)
- **Components:**
  - Profile header with avatar
  - Loyalty points card (clickable, navigates to /loyalty-points)
  - Profile information form
- **UI States:**
  - Edit mode toggle (view/edit)
- **Notes:** User profile management, requires authentication

---

### 10. OrderHistoryPage
- **Route:** `/orders`
- **Type:** Full Page
- **Layout:** Standard (Header + Footer)
- **Components:**
  - Page header
  - Review guide banner (conditional)
  - Status filter buttons
  - Statistics cards
  - Order cards grid
- **UI States:**
  - Status filter: 'all' | 'pending' | 'processing' | 'repairing' | 'completed' | 'cancelled'
  - OrderDetailModal (triggered from order card)
  - ReviewModal (triggered from order detail or review button)
  - InvoicePreviewModal (triggered from order detail)
  - Review guide visibility toggle
- **Notes:** Order management page, requires authentication

---

### 11. LoyaltyPointsPage
- **Route:** `/loyalty-points`
- **Type:** Full Page
- **Layout:** Standard (Header + Footer)
- **Components:**
  - Points header with total points
  - Current tier badge
  - Points history list
  - Promotion tiers table
  - Next tier progress
- **UI States:** None
- **Notes:** Loyalty program page, requires authentication

---

## UI States (Not Full Pages)

### Modals

#### BookServiceModal
- **Type:** Modal/Dialog
- **Trigger:** "Đặt dịch vụ" button on ServiceDetailPage
- **Purpose:** Service booking form
- **Parent Page:** ServiceDetailPage

#### ServiceDetailModal
- **Type:** Modal/Dialog
- **Trigger:** Service card click (if used)
- **Purpose:** Quick service preview
- **Parent Page:** ServicesPage (if used)

#### OrderDetailModal
- **Type:** Modal/Dialog
- **Trigger:** "Xem chi tiết" button on OrderCard
- **Purpose:** Full order details view
- **Parent Page:** OrderHistoryPage, TasksPage (orders tab)
- **Nested States:**
  - InvoicePreviewModal (triggered from order detail)
  - ReviewModal (triggered from order detail)

#### InvoicePreviewModal
- **Type:** Modal/Dialog
- **Trigger:** "Xem hóa đơn" button in OrderDetailModal
- **Purpose:** Invoice PDF preview
- **Parent Page:** OrderDetailModal (nested)

#### ReviewModal
- **Type:** Modal/Dialog
- **Trigger:** "Đánh giá dịch vụ" button on OrderCard or OrderDetailModal
- **Purpose:** Submit service review with rating, text, and images
- **Parent Page:** OrderHistoryPage, OrderDetailModal

#### WorkerSelectionModal
- **Type:** Modal/Dialog
- **Trigger:** Service type card click on ServiceWorkerSelector
- **Purpose:** Select available worker for service
- **Parent Page:** HomePage, ServicesPage

---

### Floating Components

#### ChatBox
- **Type:** Floating component
- **Trigger:** Chat icon button (always visible)
- **Purpose:** Customer support chat
- **Parent Page:** All pages (global)
- **Notes:** Uses ChatContext for state management

#### FloatingContact
- **Type:** Floating component
- **Trigger:** Always visible
- **Purpose:** Quick contact buttons (call, consult)
- **Parent Page:** All pages (global)

---

### Tab States

#### TasksPage Tabs
- **Type:** Tab navigation
- **States:** 'profile' | 'orders' | 'promotions'
- **Purpose:** Switch between profile management, order history, and promotions
- **Parent Page:** TasksPage

#### LoginPage Login Method Tabs
- **Type:** Tab navigation
- **States:** 'username' | 'email' | 'phone'
- **Purpose:** Switch login input method
- **Parent Page:** LoginPage

---

### Toggle States

#### Password Visibility Toggle
- **Type:** Toggle
- **States:** show/hide password
- **Parent Pages:** LoginPage, RegisterPage

#### Profile Edit Mode Toggle
- **Type:** Toggle
- **States:** view/edit mode
- **Parent Page:** ProfilePage, TasksPage (profile tab)

#### Review Guide Visibility Toggle
- **Type:** Toggle
- **States:** show/hide guide banner
- **Parent Page:** OrderHistoryPage

---

## Shared Layout Components

### Header
- **Type:** Layout component
- **Usage:** All pages except LoginPage, RegisterPage
- **Features:**
  - Logo
  - Navigation links
  - User menu dropdown (conditional on auth state)
  - Mobile menu toggle

### Footer
- **Type:** Layout component
- **Usage:** All pages except LoginPage, RegisterPage
- **Features:**
  - Company info
  - Quick links
  - Contact information
  - Social media links

---

## Summary

- **Total Full Pages:** 11
- **Total Modals:** 6
- **Total Floating Components:** 2
- **Total Tab Interfaces:** 2
- **Total Toggle States:** 3

**Pages with Standard Layout:** 9 (Home, Services, ServiceDetail, News, Contact, Tasks, Profile, Orders, Loyalty)
**Pages with Full-Screen Layout:** 2 (Login, Register)

