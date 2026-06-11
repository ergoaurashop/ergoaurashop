# ErgoAura Shop - E-Commerce Architecture Plan

## Overview

Premium e-commerce website for ErgoAura Shop with Apple-inspired black & white aesthetic, mobile-first design, cart sidebar, order tracking, and admin dashboard.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database & Auth**: Supabase
- **Payments**: Razorpay
- **Deployment**: Vercel
- **Version Control**: GitHub

---

## 1. Project Initialization & Structure

### 1.1 File Structure

```
d:/ergoaurashop.com/ergoaura-shop/
├── .env.local                  # Environment variables
├── next.config.js
├── tailwind.config.ts
├── package.json
├── public/
│   └── images/                 # Product & static images
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (Header, Footer, Cart)
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles
│   │   ├── products/
│   │   │   ├── page.tsx        # All products listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Product detail page
│   │   ├── cart/
│   │   │   └── page.tsx        # Full cart page (fallback)
│   │   ├── checkout/
│   │   │   └── page.tsx        # Checkout page
│   │   ├── track-order/
│   │   │   ├── page.tsx        # Track order input page
│   │   │   └── [trackId]/
│   │   │       └── page.tsx    # Track order result
│   │   ├── terms/
│   │   │   └── page.tsx        # Terms & Conditions (10+ pages content)
│   │   ├── signup/
│   │   │   └── page.tsx        # Signup page
│   │   ├── signin/
│   │   │   └── page.tsx        # Signin page
│   │   ├── account/
│   │   │   └── page.tsx        # User account
│   │   └── masteradminmyo/
│   │       └── page.tsx        # Admin dashboard
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── CartSidebar.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx      # Apple-style buttons
│   │   │   ├── Input.tsx       # Apple-style inputs
│   │   │   ├── Badge.tsx
│   │   │   └── Card.tsx
│   │   ├── legal/
│   │   │   └── TermsContent.tsx # Terms & Conditions full content component
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductImages.tsx
│   │   │   └── ProductInfo.tsx
│   │   ├── reviews/
│   │   │   ├── ReviewList.tsx
│   │   │   ├── ReviewCard.tsx
│   │   │   └── ReviewForm.tsx
│   │   ├── order/
│   │   │   ├── TrackOrderInput.tsx
│   │   │   ├── OrderTimeline.tsx
│   │   │   └── OrderDetails.tsx
│   │   ├── auth/
│   │   │   ├── SignupForm.tsx
│   │   │   └── SigninForm.tsx
│   │   └── cart/
│   │       ├── CartItem.tsx
│   │       └── CartSummary.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts       # Supabase client
│   │   │   ├── auth.ts         # Auth helpers
│   │   │   └── database.ts     # DB queries
│   │   ├── utils.ts            # Utility functions
│   │   ├── constants.ts        # Constants
│   │   └── types.ts            # TypeScript types
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useAuth.ts
│   │   └── useProducts.ts
│   ├── store/
│   │   └── cartStore.ts        # Zustand or Context for cart
│   └── styles/
│       └── theme.ts            # Design tokens
└── supabase/
    └── schema.sql              # Database schema
```

---

## 2. Database Schema (Supabase)

### 2.1 Tables

```sql
-- Users table (managed by Supabase Auth + custom fields)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2) NOT NULL,
  discount_percentage INTEGER NOT NULL,
  category TEXT,
  images TEXT[], -- Array of image URLs
  stock INTEGER DEFAULT 0,
  features TEXT[], -- Key product features
  specifications JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT UNIQUE NOT NULL, -- Readable order ID (e.g., ORD-xxxxx)
  track_id TEXT UNIQUE NOT NULL, -- 12-char alphanumeric track ID
  user_id UUID REFERENCES profiles(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  address JSONB NOT NULL,
  products JSONB NOT NULL, -- Array of {product_id, name, price, quantity, image}
  subtotal DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  payment_id TEXT, -- Razorpay payment ID
  payment_status TEXT DEFAULT 'pending', -- pending, paid, failed
  order_status TEXT DEFAULT 'placed', -- placed, shipped, out_for_delivery, delivered
  placed_at TIMESTAMPTZ DEFAULT NOW(),
  shipped_at TIMESTAMPTZ,
  out_for_delivery_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  user_name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.2 Key Database Functions

- `generate_track_id()` - Generates unique 12-char alphanumeric track ID
- `generate_order_id()` - Generates readable order ID (ORD-XXXXXXXX)
- `calculate_discount()` - Returns a random discount percentage (30-75%) per product (set at product creation, not random at runtime)

---

## 3. Design System - Apple-Inspired Black & White

### 3.1 Color Palette

```
-- Primary: #000000 (Black)
-- Secondary: #FFFFFF (White)
-- Background: #F5F5F7 (Apple light gray)
-- Text Primary: #1D1D1F (Apple dark text)
-- Text Secondary: #86868B (Apple secondary text)
-- Accent: #0071E3 (Apple blue - minimal use)
-- Border: #D2D2D7 (Apple light border)
-- Success: #30D158
-- Error: #FF453A
```

### 3.2 Typography

- Font: Inter (Google Font) - San Francisco alternative
- Headings: 700 weight, tight letter-spacing
- Body: 400 weight, generous line-height

### 3.3 Border Radius (Premium Round)

- Cards: 12px (rounded corners)
- Buttons: 12px
- Inputs: 10px
- Modals/Sidebar: 16px top corners
- Images: 8px

### 3.4 Button Styles

```css
.apple-button {
  background: #000;
  color: #fff;
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 500;
  transition: all 0.2s ease;
}
.apple-button:hover {
  opacity: 0.85;
}
.apple-button-outline {
  border: 1px solid #000;
  color: #000;
  background: transparent;
  border-radius: 12px;
}
```

---

## 4. Component Architecture & Data Flow

### 4.1 Layout Structure

```
RootLayout
├── Header (sticky, transparent on scroll)
│   ├── Logo
│   ├── Nav Links (Home, Products, About)
│   ├── TrackOrderInput (text box)
│   ├── Sign In / Account
│   └── Cart Icon (with item count badge)
├── CartSidebar (slide-in drawer from right)
│   ├── Cart Items (scrollable)
│   ├── Cart Summary (subtotal, discount, total)
│   └── Checkout Button
├── Main Content (page-specific)
├── Footer
│   ├── About / Links
│   ├── TrackOrderInput (text box)
│   ├── Cancel Order (input + submit)
│   └── Social / Copyright
└── MobileNav (bottom nav for mobile)
```

### 4.2 Cart State Management

- Using React Context + useReducer for cart state
- Persist cart in localStorage
- CartSidebar slides in from right on cart icon click
- Add to cart button triggers sidebar open animation
- Cart counts shown as badge on cart icon

### 4.3 Auth Flow

- Supabase Auth for email/password
- Custom profiles table linked to auth.users
- Signup collects: Name, Email, Phone (+91 pre-filled), Password
- Signin: Email + Password
- Auth NOT required for checkout (guest checkout allowed)

### 4.4 Payment Flow (Razorpay)

```
1. User fills checkout form (name, email, phone, address)
2. Frontend creates order via Razorpay API (server-side)
3. Razorpay checkout modal opens
4. On success:
   - Generate Track ID (12-char alphanumeric)
   - Generate Order ID
   - Save order to Supabase
   - Show success page with Track ID, Order ID, user & product details
5. On failure: Show error
```

### 4.5 Track Order Flow

```
1. User enters Track ID in header/footer text box
2. Redirect to /track-order/[trackId]
3. Fetch order from Supabase by track_id
4. Calculate current status based on days since placed_at:
   - Day 1-3:   "Order Successfully Placed"
   - Day 4-20:  "Order Shipped"
   - Day 21-35: "Out for Delivery"
   - Day 36+:   "Order Delivered"
5. Display animated timeline/route with status milestones
6. Show order details (products, customer info, address)
```

### 4.6 Timeline Animation (Framer Motion)

- Vertical timeline with circular nodes
- Each node connected by lines
- Completed nodes: filled black with checkmark
- Current node: pulsing animation
- Future nodes: gray/outline
- Light stagger animation on load

---

## 5. Pages & Features Detail

### 5.1 Home Page (/)

- Hero section with product showcase (full-bleed image)
- Featured products grid (2 cols mobile, 4 cols desktop)
- Category browse section
- Apple-style typography with large headings
- Smooth scroll animations

### 5.2 Products Page (/products)

- Filterable grid layout
- Category filters (horizontal scroll on mobile)
- Sort by (price, name, newest)
- Product cards with: image, name, price, original price crossed out, discount badge
- Rounded corners on cards

### 5.3 Product Detail (/products/[slug])

- Image gallery (main image + thumbnails)
- Product info: name, description, price, original price, discount %
- Key features list (Apple-style bullet points)
- Specifications table
- Size/Variant selector (if applicable)
- Add to cart button (full-width on mobile)
- Reviews section:
  - Star rating summary (average, count, distribution)
  - Review cards with: user name, rating, date, comment
  - Photo reviews (some reviews include product photos)
  - Write review form (requires sign in)
- Related products

### 5.4 Checkout (/checkout)

- Guest checkout (no sign-in required)
- Form fields:
  - Full Name
  - Email
  - Phone (+91 pre-filled)
  - Address (line 1, line 2, city, state, pincode)
- Order summary (cart items, subtotal, total)
- Razorpay payment button
- On success: redirect to success page with Track ID & Order ID

### 5.5 Terms & Conditions (/terms)

- Comprehensive legal document rendered as a single scrollable page in Apple-style typography
- Minimum 10+ pages of content when printed, covering all world-class e-commerce legal standards
- Split into numbered sections with sticky navigation sidebar on desktop
- Black & white Apple-style layout with clean, professional formatting
- Linked in footer (mandatory) and checkout page (checkbox: "I agree to the Terms & Conditions")
- Stored as a React component [`src/components/legal/TermsContent.tsx`](src/components/legal/TermsContent.tsx) for easy updates

#### T&C Content Structure (10+ Clauses):

| #   | Clause                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Definitions & Interpretation**       | Defines "Company", "Customer", "Products", "Services", "Platform", "Agreement" in legally broad terms                                                                                                                                                                                                                                                                                                                                                                                                          |
| 2   | **Eligibility & Account Registration** | Age restrictions, accurate information requirement, account suspension rights                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 3   | **Product Listings & Pricing**         | Pricing errors clause, typographical error protection, price change rights without notice                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 4   | **Orders & Acceptance**                | Order = offer (not acceptance), company reserves right to reject/cancel any order, confirmation email ≠ acceptance                                                                                                                                                                                                                                                                                                                                                                                             |
| 5   | **Payment Terms**                      | Razorpay processing, payment methods, currency (INR), authorization holds                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 6   | **Shipping & Delivery**                | Estimated timelines not guaranteed, delivery address responsibility, failed delivery charges, risk passes on dispatch                                                                                                                                                                                                                                                                                                                                                                                          |
| 7   | **Cancellation & Refund Policy**       | **_Complex language protecting company:_** Standard refunds processed within 7-14 business days. Full refund cycle may take up to 180 business days due to banking, compliance, and verification protocols. Company reserves right to deduct processing/restocking fees (up to 25%). No cancellation once order enters "Shipped" status. Refunds only to original payment method. No cash refunds. Store credit may be issued at company's sole discretion. Force majeure clause for delivery delays/failures. |
| 8   | **Track & Trace System**               | Track ID accuracy not guaranteed. Status updates are estimates. System may experience delays. Company not liable for reliance on tracking information.                                                                                                                                                                                                                                                                                                                                                         |
| 9   | **Intellectual Property**              | All content, trademarks, designs owned by company. No reproduction without written consent.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 10  | **User Conduct & Reviews**             | No fake reviews. Company reserves right to remove/edit any user content. User grants royalty-free license to all submitted content.                                                                                                                                                                                                                                                                                                                                                                            |
| 11  | **Data Protection & Privacy**          | Data collection, usage, sharing policies. Cookies. Compliance with applicable privacy laws.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 12  | **Limitation of Liability**            | **_Critical clause:_** Company's maximum liability capped at product purchase price. Under no circumstances liable for consequential, indirect, or incidental damages. No liability for delivery failures due to third-party carriers, natural disasters, strikes, governmental actions, or any force majeure events. Product descriptions for informational purposes only; actual product may vary.                                                                                                           |
| 13  | **Warranty & Guarantee**               | Products provided "AS IS" without warranty. Manufacturer warranty (if any) passes to customer. No express or implied warranties of merchantability or fitness.                                                                                                                                                                                                                                                                                                                                                 |
| 14  | **Indemnification**                    | Customer indemnifies company against all claims arising from use of platform, violation of terms, or infringement of rights.                                                                                                                                                                                                                                                                                                                                                                                   |
| 15  | **Termination**                        | Company may terminate accounts at any time without notice. Suspension for violation of any term.                                                                                                                                                                                                                                                                                                                                                                                                               |
| 16  | **Dispute Resolution & Governing Law** | Mandatory arbitration clause (no class actions). Jurisdiction: courts located in [city]. Governing law: [country] law.                                                                                                                                                                                                                                                                                                                                                                                         |
| 17  | **Amendments**                         | Company reserves right to modify terms at any time. Continued use constitutes acceptance. Notification via email or platform notice.                                                                                                                                                                                                                                                                                                                                                                           |
| 18  | **Severability & Waiver**              | If any clause is unenforceable, remaining terms continue. Failure to enforce does not constitute waiver.                                                                                                                                                                                                                                                                                                                                                                                                       |
| 19  | **Entire Agreement**                   | These terms constitute entire agreement. Supersedes all prior communications.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 20  | **Contact & Grievance Officer**        | Official contact details, grievance officer details as required by applicable law.                                                                                                                                                                                                                                                                                                                                                                                                                             |

#### Key Protective Language Highlights:

- **Refund timeline**: "Refunds, once approved, shall be processed within 7-14 business days. However, depending on banking protocols, intermediary verification procedures, and compliance requirements, the total refund cycle may extend up to 180 business days from the date of cancellation approval."
- **Delivery failure**: "The Company shall not be held liable for any failure, delay, or inability to deliver products arising from force majeure events, third-party carrier actions, incorrect address provided by Customer, or circumstances beyond Company's reasonable control."
- **Non-delivery protection**: "In the event the product is not delivered or is delayed beyond estimated timelines, Customer's sole remedy shall be a refund of the purchase price paid, subject to the refund timeline specified herein. Under no circumstances shall Company be liable for any consequential, special, or punitive damages."

### 5.6 Order Success (/order/success?order_id=xxx)

- Confirmation animation (checkmark)
- Track ID (12-char alphanumeric) - prominently displayed
- Order ID
- Customer details
- Product details
- "Track Order" button
- Print receipt option

### 5.6 Track Order (/track-order/[trackId])

- Fetch order by track ID
- Animated timeline (Framer Motion):
  - Node 1: Order Placed (Day 1-3) - ✓
  - Line animation
  - Node 2: Shipped (Day 4-20)
  - Line animation
  - Node 3: Out for Delivery (Day 21-35)
  - Line animation
  - Node 4: Delivered (Day 36+)
- Order details card:
  - Order ID
  - Customer name
  - Products purchased
  - Delivery address
  - Payment status
- Professional, premium design

### 5.10 Admin Dashboard (/masteradminmyo)

- Simple auth check (username: MyonMee, password: MyonMee@2029)
- Hardcoded credentials (client-side check - basic security)
- Dashboard overview:
  - Total orders count
  - Total revenue
  - Recent orders table
  - Products management
  - Order status updates
- Accessible only at this exact route

### 5.11 Signup (/signup)

- Name field
- Email field
- Phone field (+91 pre-filled, readonly prefix)
- Password field (with show/hide toggle)
- Submit button (Apple style)
- Link to sign in
- Success: auto sign in + redirect to account

### 5.12 Signin (/signin)

- Email field
- Password field
- Submit button
- Link to sign up
- Error handling for invalid credentials

---

## 6. Pricing & Discount Logic

### 6.1 Discount Strategy

- Each product has a `discount_percentage` column (set at product creation)
- Values range from 30 to 75
- `original_price` = `price` / (1 - `discount_percentage`/100)
- Example: If price = ₹999 and discount = 40%, original_price = ₹1665
- Discount badge shows "-40%" on product cards
- Original price shown with strikethrough

### 6.2 Bulk Discount (Cart Level)

- Optional: Cart subtotal discounts at thresholds (e.g., 10% off above ₹5000)
- Can be implemented as a future enhancement

---

## 7. Media Standards & Product Content Organization

See the dedicated guide at [`plans/media-standards-guide.md`](plans/media-standards-guide.md) for full details.

### 7.1 Quick Reference - Universal Image Size

| Standard              | Value                                         |
| --------------------- | --------------------------------------------- |
| **Master Image Size** | 1500 x 1500 px (1:1 Square at 96 DPI)         |
| **Format**            | JPG quality 80% (target 150-300KB)            |
| **Primary file**      | `01.jpg` (used in all grids, cart, checkout)  |
| **Gallery files**     | `02.jpg` through `06.jpg` (product page only) |
| **Video**             | MP4 H.264, 1920x1920px, max 10MB              |
| **Composition**       | Product centered, ~60-70% of frame, white bg  |

### 7.2 File Organization

```
public/images/
├── logo/
│   ├── ergoauralogo.webp
│   └── favicon.ico
├── products/
│   ├── [product-slug]/
│   │   ├── 01.jpg      # Primary (grid, cart, checkout)
│   │   ├── 02.jpg      # Gallery
│   │   ├── 03.jpg      # Gallery
│   │   ├── 04.jpg      # Gallery
│   │   ├── 05.jpg      # Gallery (optional)
│   │   ├── 06.jpg      # Gallery (optional)
│   │   └── video.mp4   # Product video (optional)
├── reviews/
│   └── [review-id]/
│       └── photo-1.jpg
├── banners/
│   ├── hero-home.jpg           # 2000x1000px
│   └── hero-category.jpg       # 2000x600px
└── og-image.jpg                # 1200x630px
```

### 7.3 Per-Product Content Checklist

| Item                     | Format               | Required |
| ------------------------ | -------------------- | -------- |
| Primary image 01.jpg     | 2000x2000 JPG        | Yes      |
| Gallery images 02-06.jpg | 2000x2000 JPG        | Yes      |
| Product video            | MP4 1920x1920        | Optional |
| Product name             | Text, max 60 chars   | Yes      |
| Short description        | Text, max 120 chars  | Yes      |
| Full description         | Text, 500-1000 chars | Yes      |
| Features                 | 5-8 bullet points    | Yes      |
| Specifications           | 6-10 key:value pairs | Yes      |
| What's in box            | Item list            | Yes      |
| Current price            | INR number           | Yes      |
| Discount %               | 30-75                | Yes      |
| Category                 | Text slug            | Yes      |

---

## 8. Track ID Generation

```javascript
function generateTrackId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result; // e.g., "A7X9K2M4P1QW"
}
```

---

## 8. Environment Variables (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_public_key
```

---

## 9. Implementation Phases

### Phase 1: Project Setup & Foundation

...

### Phase 2: Design System & UI Components

...

### Phase 3: Cart System

...

### Phase 4: Products

...

### Phase 5: Auth System

...

### Phase 6: Checkout & Payments

...

### Phase 7: Order Tracking

...

### Phase 8: Reviews

...

### Phase 9: Admin Dashboard

...

### Phase 10: Terms & Conditions Page

- Create [`src/components/legal/TermsContent.tsx`](src/components/legal/TermsContent.tsx) with full 20-clause content
- Create [`src/app/terms/page.tsx`](src/app/terms/page.tsx) page wrapping TermsContent component
- Style in Apple black & white theme, clean typography, sticky section navigation
- Add Terms & Conditions link in footer (mandatory)
- Add "I agree to Terms & Conditions" checkbox on checkout page
- Ensure minimum 10+ pages of printed content

### Phase 11: Polish & Optimization

### Phase 1: Project Setup & Foundation

- Initialize Next.js project with TypeScript
- Configure Tailwind CSS with Apple theme
- Set up folder structure
- Set up Supabase project & schema
- Create root layout with Header & Footer

### Phase 2: Design System & UI Components

- Create Apple-style Button, Input, Card, Badge components
- Implement global CSS with Apple theme variables
- Build responsive grid system

### Phase 3: Cart System

- Build CartSidebar component with slide animation
- Implement cart state management (Context + localStorage)
- Cart item add/remove/quantity controls
- Cart badge on header icon

### Phase 4: Products

- Create products in Supabase (seed data)
- ProductGrid with responsive layout
- ProductCard with image, price, discount, rounded corners
- Product detail page with gallery, info, features

### Phase 5: Auth System

- Supabase Auth setup
- Signup page with phone (+91)
- Signin page
- Protected routes (account page)
- Auth context/hooks

### Phase 6: Checkout & Payments

- Checkout form (guest checkout)
- Razorpay integration
- Order creation on success
- Track ID & Order ID generation
- Order success page

### Phase 7: Order Tracking

- TrackOrderInput in header & footer
- Track order result page
- Animated timeline component
- Dynamic status based on days elapsed
- Cancel Order in footer

### Phase 8: Reviews

- Review form component
- Review list with star ratings
- Photo upload for reviews
- Display reviews on product pages

### Phase 9: Admin Dashboard

- /masteradminmyo route with hardcoded auth
- Dashboard overview (orders, revenue)
- Order management table
- Product CRUD

### Phase 10: Polish & Optimization

- Framer Motion animations throughout
- Mobile responsiveness audit
- Performance optimization
- SEO meta tags
- Accessibility review
- Deploy to Vercel
- Push to GitHub
