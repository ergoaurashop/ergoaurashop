# Contact Us Page — Implementation Plan

## Overview

Create a professional, visually stunning Contact Us page at `/contact-us` for ErgoAura Shop. The page follows the existing "Desert Luxury" design system (gold/sand/dark palette) and uses Framer Motion for animations.

---

## Design System Tokens (Existing)

| Token             | Value            | Usage                      |
| ----------------- | ---------------- | -------------------------- |
| `--color-gold`    | `#C9A962`        | Accents, icons, highlights |
| `--color-sand`    | `#F5F1EB`        | Page background            |
| `--color-primary` | `#1A1614`        | Text, headers              |
| `--color-white`   | `#FFFFFF`        | Card backgrounds           |
| Font Display      | Playfair Display | Section headings           |
| Font Sans         | Inter            | Body text                  |

---

## Page Structure

```
┌─────────────────────────────────────────┐
│           HERO / PAGE HEADER            │
│     "Get in Touch" + subtitle           │
│     Gold gradient decorative line       │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────┐  ┌──────────────┐    │
│  │ CONTACT INFO  │  │ CONTACT FORM  │    │
│  │ (Left Column) │  │ (Right Column)│    │
│  │              │  │              │    │
│  │ • Emails x3  │  │  Name        │    │
│  │ • Social     │  │  Email       │    │
│  │ • Addresses  │  │  Phone       │    │
│  │              │  │  Subject     │    │
│  │              │  │  Message     │    │
│  │              │  │  [Submit]    │    │
│  └──────────────┘  └──────────────┘    │
│                                         │
│  → On submit: Animated Thank You modal  │
│                                         │
├─────────────────────────────────────────┤
│            MAP / LOCATIONS              │
│     (Stylized address cards)            │
└─────────────────────────────────────────┘
```

---

## Files to Create / Modify

### 1. `src/app/contact-us/page.tsx` — **NEW** (Server Component wrapper)

- Exports `metadata` for SEO (title, description, canonical)
- Renders the client component `ContactUsClient`

### 2. `src/app/contact-us/ContactUsClient.tsx` — **NEW** (Client Component)

The main client component containing all interactive parts:

**State:**

- `formState`: `"idle" | "submitting" | "submitted"`
- Form fields: `name`, `email`, `phone`, `subject`, `message`
- `errors`: validation error messages per field
- `touched`: track which fields have been interacted with

**Sections:**

1. **Hero Header** — Title, subtitle, decorative gold line with `framer-motion` fade-in
2. **Two-column layout** (responsive: stack on mobile)
   - **Left: Contact Information**
     - Email cards (envelope icon + email address with mailto link)
     - Social media icons (Instagram, Facebook) with hover effects
     - Address cards (MapPin icon) for both locations
   - **Right: Contact Form**
     - Uses existing `Input` and `Button` UI components
     - Gold accent focus states
     - Inline validation on blur
3. **Thank You Modal** (animated overlay on submit)
   - Framer Motion: scale + fade in
   - Checkmark circle animation (draw SVG path)
   - "Thank You" heading + message
   - "Send Another Message" button to reset form

**Form Validation (client-side only):**

- Name: required, min 2 chars
- Email: required, valid email regex
- Phone: optional, valid if provided
- Subject: required, min 3 chars
- Message: required, min 10 chars

**Form Behavior:**

- On submit: validate all fields → if valid, simulate 1.5s delay → show thank you modal
- No data is persisted (as requested)

### 3. No modifications to existing files needed

The Header already exists and the page is discoverable via its route `/contact-us`. No nav changes required unless desired (optional).

---

## Implementation Details

### Hero Section

```tsx
// framer-motion fade-in from bottom
<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Get in Touch
</motion.h1>
```

### Contact Info Cards

- Each email displayed as a card with icon and `mailto:` link
- Social icons use same SVG paths from Footer, with gold hover color
- Address cards show full address with line breaks and MapPin icon

### Contact Form

- Uses `Input` component for: Name, Email, Phone, Subject
- Uses a `<textarea>` styled consistently with Input for Message
- Submit button uses `Button` component with `variant="primary"` and `loading` state
- Gold focus ring on all inputs

### Thank You Animation

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ type: "spring", damping: 25, stiffness: 300 }}
>
  {/* Animated checkmark circle */}
  {/* "Thank You!" heading */}
  {/* "We've received your message..." text */}
</motion.div>
```

### Responsive Behavior

- **Desktop (lg+)**: Two-column grid (`grid-cols-2`), form on right
- **Tablet/Phone**: Single column, stacked layout
- All spacing uses the existing `section-container` class

---

## Data References

From `src/lib/constants.ts`:

- `CONTACT_EMAIL` = `info@ergoaurashop.com`
- `COMPLAINT_EMAIL` = `customer@ergoaurashop.com`
- `SUGGESTION_EMAIL` = `suggessions@ergoaurashop.com`
- `SOCIAL_LINKS.instagram` = `https://www.instagram.com/shopergoaura/`
- `SOCIAL_LINKS.facebook` = `https://www.facebook.com/profile.php?id=61590640415430`

Addresses:

- **Warehouse:** Warehouse 1, Hullahalli Industrial Area, Bangalore, Karnataka
- **International Shipping Office:** #office 213, Prime Tower - 20th Floor - Business Bay, Dubai, United Arab Emirates

---

## Animations Summary

| Element             | Animation             | Trigger                |
| ------------------- | --------------------- | ---------------------- |
| Page hero           | Fade up + slide       | On mount               |
| Contact info cards  | Staggered fade up     | On mount               |
| Form fields         | Fade up with delay    | On mount               |
| Submit button       | Loading spinner       | On submit              |
| Thank You modal     | Spring scale + fade   | On form submit success |
| Thank You checkmark | SVG path draw         | On modal appear        |
| Social icons        | Gold color transition | On hover               |
| Address cards       | Subtle lift on hover  | On hover               |

---

## Dependencies Used

- `framer-motion` — already in `package.json` (v11)
- `clsx` / `tailwind-merge` — already in project via `cn()`
- `next/link` — for navigation
- Existing `Input` and `Button` UI components

---

## Task Breakdown for Implementation

1. Create directory `src/app/contact-us/`
2. Create `src/app/contact-us/page.tsx` (Server Component with metadata)
3. Create `src/app/contact-us/ContactUsClient.tsx` (Client Component with form, info, animations)
4. Verify the page renders correctly by checking the dev server
