# ErgoAura Shop - Media Standards & Product Content Guide

## 1. Universal Single Image Standard

**One master image size for ALL contexts: 1500 x 1500 pixels (1:1 Square at 96 DPI)**

This single image file works everywhere on the site. All your existing photos at 1500x1500px 96 DPI are ready to use. Here's how it renders in each location:

| Location                    | Rendered Size                        | CSS Technique                               |
| --------------------------- | ------------------------------------ | ------------------------------------------- |
| Product Grid Card           | 300x300px mobile / 400x400px desktop | `object-fit: cover` with 12px border-radius |
| Product Detail - Main Image | 600x600px                            | `object-fit: contain` with hover zoom       |
| Product Detail - Thumbnails | 80x80px                              | `object-fit: cover` with 8px border-radius  |
| Cart Sidebar Item           | 80x80px                              | `object-fit: cover` with 8px border-radius  |
| Checkout Summary            | 60x60px                              | `object-fit: cover` with 6px border-radius  |
| Order Success Page          | 100x100px                            | `object-fit: cover` with 8px border-radius  |
| Customer Review Photo       | 120x120px                            | `object-fit: cover` with 8px border-radius  |
| Social Share (OG)           | 1200x630px                           | Separate OG image (see below)               |

### Why 1500x1500px?

- **Retina-ready**: Sharp on 2x displays (covers up to 750x750px rendered size)
- **Square fits rounded grids**: Perfect for the premium rounded-corner grid design
- **Single source of truth**: One file, no cropping, no reformatting per context
- **Web-optimized**: Smaller file size = faster loading (target 150-300KB per image)
- **Zoom capable**: Enough resolution for lightbox/zoom features
- **Your existing assets**: No need to resize — your current 1500x1500px photos work immediately

### Product Photography Composition Rule

```
┌───────────────────────────┐
│                           │
│     (75px padding)        │
│                           │
│      ┌─────────────┐      │
│      │             │      │
│      │   PRODUCT   │      │
│      │   CENTERED  │      │
│      │  60-70% of │      │
│      │    frame   │      │
│      │             │      │
│      └─────────────┘      │
│                           │
│         1500px           │
└───────────────────────────┘
```

- Product centered in frame
- Subject covers ~60-70% of total area
- Clean white or light gray background
- Consistent lighting across all products
- At least 100px padding from all edges

---

## 2. Image File Naming Convention

```
public/images/products/
├── [product-slug]/
│   ├── 01.jpg          <-- PRIMARY IMAGE (used in grids, cart, checkout)
│   ├── 02.jpg          <-- Gallery image 2
│   ├── 03.jpg          <-- Gallery image 3
│   ├── 04.jpg          <-- Gallery image 4 (optional)
│   ├── 05.jpg          <-- Gallery image 5 (optional)
│   └── 06.jpg          <-- Gallery image 6 (optional)
```

**Rules:**

- File `01.jpg` is ALWAYS the primary/hero image
- This primary image is the one used in product grids, cart sidebar, checkout
- Additional images (02-06) shown only in the product detail gallery
- Maximum 6 images per product (performance optimization)
- All images are 1500x1500px at JPG quality 80%
- Use `product-slug` matching the URL slug for each product

### Example for "ErgoAura Pro Keyboard"

Slug: `ergoaura-pro-keyboard`

```
public/images/products/ergoaura-pro-keyboard/
├── 01.jpg     # Front-facing hero shot (used in grids + cart + checkout)
├── 02.jpg     # Side angle
├── 03.jpg     # Top-down view
├── 04.jpg     # Close-up of key switches
├── 05.jpg     # Lifestyle shot on desk setup
└── 06.jpg     # With accessories/box contents
```

---

## 3. Video Standards

| Property      | Specification                              |
| ------------- | ------------------------------------------ |
| Resolution    | 1500 x 1500px (Square 1:1 to match images) |
| Format        | MP4 with H.264 codec                       |
| Max Duration  | 30-60 seconds                              |
| Max File Size | 10MB                                       |
| Bitrate       | 5-8 Mbps                                   |
| Frame Rate    | 30fps                                      |
| Audio         | AAC 128kbps or silent                      |
| Placement     | Product detail page only (never in grids)  |
| Poster Frame  | Uses 01.jpg as fallback thumbnail          |

**Video file naming:**

```
public/images/products/[product-slug]/
├── video.mp4      <-- Product showcase video
├── 01.jpg         <-- Also serves as video poster
```

---

## 4. Complete File Organization

```
public/images/
├── logo/
│   ├── ergoauralogo.webp          # Primary logo for header
│   └── favicon.ico                 # Browser tab icon
├── products/
│   ├── [product-slug-1]/
│   │   ├── 01.jpg                 # Primary (1500x1500)
│   │   ├── 02.jpg                 # Gallery (1500x1500)
│   │   ├── 03.jpg                 # Gallery (1500x1500)
│   │   ├── 04.jpg                 # Gallery (1500x1500)
│   │   ├── 05.jpg                 # Gallery (1500x1500)
│   │   ├── 06.jpg                 # Gallery (1500x1500)
│   │   └── video.mp4              # Optional product video
│   ├── [product-slug-2]/
│   │   └── ... (same structure)
│   └── [product-slug-3]/
│       └── ... (same structure)
├── reviews/
│   └── [review-id]/
│       ├── photo-1.jpg            # Customer review photo
│       └── photo-2.jpg            # Customer review photo (optional)
├── banners/
│   ├── hero-home.jpg              # Homepage hero (1500x750px)
│   └── hero-category.jpg          # Category page banner (1500x450px)
└── og-image.jpg                   # Default social share (1200x630px)
```

---

## 5. Per-Product Data Template

For each product you add, you need to prepare this data:

```json
{
  "name": "ErgoAura Pro Keyboard",
  "slug": "ergoaura-pro-keyboard",
  "short_description": "Split ergonomic keyboard with mechanical switches",
  "description": "Full detailed description - 500-1000 characters describing the product, its benefits, and why customers need it...",
  "price": 4999,
  "discount_percentage": 40,
  "category": "keyboards",
  "features": [
    "Feature benefit 1 - what it does for the user",
    "Feature benefit 2 - solve a pain point",
    "Feature benefit 3 - premium material/quality",
    "Feature benefit 4 - unique selling point",
    "Feature benefit 5 - guarantee/warranty mention"
  ],
  "specifications": {
    "Connectivity": "USB-C",
    "Material": "Aluminum",
    "Weight": "680g",
    "Color": "Space Gray",
    "Warranty": "2 Years"
  },
  "whats_in_box": ["Item 1", "Item 2", "Item 3", "Item 4"]
}
```

### Image Optimization Note

At 96 DPI (screen resolution), 1500x1500px is plenty for quality display. For reference:

- Grid cards display at 300-400px = well within 2x retina range
- Product page displays at 600px = just over 2x (still very sharp)
- Cart thumbnails at 80px = far beyond retina quality
- This means FASTER page loads than 2000x2000px images

### Pricing Formula

```
original_price = price / (1 - discount_percentage/100)

Example:
price = ₹4,999
discount_percentage = 40
original_price = 4999 / (1 - 0.40) = 4999 / 0.60 = ₹8,332
```

Each product gets a DIFFERENT discount_percentage (between 30-75) for variety.

---

## 6. Your Image Preparation Workflow

```
STEP 1: Photograph product on clean white/light background
STEP 2: Your images are already 1500x1500 square - no cropping needed
STEP 3: Color correct for consistent look across all products
STEP 4: Export as JPG, quality 80% (target file size 200-400KB)
STEP 5: Save as 01.jpg (02.jpg, 03.jpg, etc. for angles)
STEP 6: Place in folder: public/images/products/[product-slug]/
STEP 7: Repeat for every product

Recommended free tools:
  - Photopea.com (browser-based Photoshop alternative)
  - Squoosh.app (compress images)
  - Canva.com (crop and resize)
  - ImageOptim (compress without quality loss)
```

---

## 7. Image Preparation Checklist (for each product)

| #   | Item                                                | Done? |
| --- | --------------------------------------------------- | ----- |
| 1   | Product name decided                                |       |
| 2   | Product slug decided (lowercase, hyphens)           |       |
| 3   | Primary photo 01.jpg taken and cropped to 1500x1500 |       |
| 4   | Gallery photos 02-06.jpg taken (multiple angles)    |       |
| 5   | Product video recorded and compressed (optional)    |       |
| 6   | Short description written (max 120 chars)           |       |
| 7   | Full description written (500-1000 chars)           |       |
| 8   | 5-8 feature bullets written                         |       |
| 9   | Specifications table populated                      |       |
| 10  | What's in the box list written                      |       |
| 11  | Current price set (in INR)                          |       |
| 12  | Discount percentage chosen (between 30-75)          |       |
| 13  | Original price auto-calculated                      |       |
| 14  | Category assigned                                   |       |

---

**Once you've prepared your images and data following this guide, the developer can bulk-import all products into Supabase and build the full site around them.**
