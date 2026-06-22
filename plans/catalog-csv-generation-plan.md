# Catalog Product CSV Generation Plan

## Objective

Populate `D:\ergoaurashop.com\catalog_products.csv` with all 14 live products from `https://ergoaurashop.com` in the required Meta/Facebook catalog format.

## Source Data

### Site Information

- **Site URL**: `https://ergoaurashop.com`
- **Product URL pattern**: `https://ergoaurashop.com/products/{slug}`
- **Image URL pattern**: `https://ergoaurashop.com/images/products/{encoded_folder_name}/{encoded_image_filename}`
- **Currency**: INR (₹)

### Products to Include (14 products)

| #   | Slug                            | Name                             | Price INR | Original | Category      | Brand    | Stock |
| --- | ------------------------------- | -------------------------------- | --------- | -------- | ------------- | -------- | ----- |
| 1   | anti-snoring-chin-strap         | Anti-Snoring Chin Strap          | 99        | 198      | wellness      | ErgoAura | 50    |
| 2   | blackhead-remover-vacuum-tool   | Blackhead Remover Vacuum Tool    | 199       | 355      | personal-care | ErgoAura | 40    |
| 3   | eye-massager-sleep-mask         | Eye Massager Sleep Mask          | 799       | 1332     | wellness      | ErgoAura | 25    |
| 4   | foot-massage-roller-spiked      | Foot Massage Roller Spiked       | 269       | 498      | wellness      | ErgoAura | 35    |
| 5   | kitchen-sink-drain-hair-catcher | Kitchen Sink Drain Hair Catcher  | 189       | 291      | kitchen       | ErgoAura | 60    |
| 6   | magnetic-usb-cable-3-in-1       | Magnetic USB Cable 3-in-1        | 145       | 250      | accessories   | ErgoAura | 55    |
| 7   | menstrual-heating-pad-usb       | Menstrual Heating Pad USB        | 399       | 767      | wellness      | ErgoAura | 30    |
| 8   | posture-corrector-belt          | Posture Corrector Belt           | 279       | 507      | wellness      | ErgoAura | 45    |
| 9   | silicone-oil-splatter-guard     | Silicone Oil Splatter Guard      | 179       | 298      | kitchen       | ErgoAura | 50    |
| 10  | waterproof-phone-pouch          | Waterproof Phone Pouch Pack of 2 | 129       | 287      | accessories   | ErgoAura | 70    |
| 11  | waterproof-shoe-covers          | Waterproof Shoe Covers           | 99        | 198      | accessories   | ErgoAura | 65    |
| 12  | samsung-galaxy-s23-ultra        | Samsung Galaxy S23 Ultra         | 24990     | 124999   | electronics   | Samsung  | 15    |
| 13  | iphone-15-pro-max-512gb         | Apple iPhone 15 Pro Max 512GB    | 46990     | 94994    | electronics   | Apple    | 9     |
| 14  | messi-argentina-2026-jersey     | Messi Argentina 2026 Jersey      | 499       | 999      | worldcup-2026 | ADIDAS   | 100   |

### Excluded

- `ergoslug-test-test` — internal payment test product (price ₹1, noindex)

## CSV Column Mapping

| Column                         | Mapping Rule                                                                      |
| ------------------------------ | --------------------------------------------------------------------------------- |
| `id`                           | Product slug (e.g., `anti-snoring-chin-strap`)                                    |
| `title`                        | Product name from `Product.name`                                                  |
| `description`                  | Product description (truncated to ~200 chars for Meta feed)                       |
| `availability`                 | Always `in stock` (all products have stock > 0)                                   |
| `condition`                    | Always `new`                                                                      |
| `price`                        | `original_price` + " INR" (e.g., `198.00 INR`)                                    |
| `link`                         | `https://ergoaurashop.com/products/{slug}`                                        |
| `image_link`                   | `https://ergoaurashop.com/images/products/{encoded_folder}/{encoded_first_image}` |
| `brand`                        | Mapped per product (ErgoAura for generic, Samsung, Apple, ADIDAS)                 |
| `google_product_category`      | Mapped from internal category (see category mapping below)                        |
| `fb_product_category`          | Same as google_product_category                                                   |
| `quantity_to_sell_on_facebook` | Stock quantity from `Product.stock`                                               |
| `sale_price`                   | `price` + " INR" (e.g., `99.00 INR`)                                              |
| `sale_price_effective_date`    | Left empty (ongoing sale, no fixed end date)                                      |
| `item_group_id`                | Empty (no variants in current catalog)                                            |
| `gender`                       | Empty or mapped if applicable (jersey could be "unisex")                          |
| `color`                        | Extracted from specifications where available                                     |
| `size`                         | Only for jersey (S, M, L, XL, XXL)                                                |
| `age_group`                    | "adult" for all products                                                          |
| `material`                     | Extracted from specifications where available                                     |
| `pattern`                      | Empty (not tracked)                                                               |
| `shipping`                     | "IN:Standard:0.00 INR" (free shipping in India)                                   |
| `shipping_weight`              | Extracted from specs or estimated                                                 |
| `offer_disclaimer`             | Stock clearance note for electronics; empty for others                            |
| `video[0].url`                 | Empty (no video URLs in current data)                                             |
| `gtin`                         | Empty (not tracked in current data)                                               |
| `product_tags[0]`              | Category name as tag                                                              |
| `product_tags[1]`              | Brand as tag                                                                      |
| `style[0]`                     | Empty (not tracked)                                                               |

## Category Mapping to Google/Facebook Product Categories

| Internal Category | Google Product Category                                      | FB Product Category                              |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------ |
| wellness          | Health & Beauty > Health Care > Sleep & Snoring              | Health & Beauty > Health > Sleep Aids            |
| personal-care     | Health & Beauty > Personal Care > Skin Care > Pore Cleansers | Health & Beauty > Beauty > Skin Care             |
| kitchen           | Home & Garden > Kitchen & Dining > Kitchen Tools & Gadgets   | Home & Garden > Kitchen & Dining > Kitchen Tools |
| accessories       | Electronics > Accessories > Cables                           | Electronics > Accessories > Cables & Adapters    |
| electronics       | Electronics > Communications > Telephony > Mobile Phones     | Electronics > Communications > Mobile Phones     |
| worldcup-2026     | Apparel & Accessories > Clothing > Activewear                | Clothing & Accessories > Clothing > Activewear   |

## Image URL Construction

For each product, the first image from `SLUG_TO_IMAGES[slug][0]` is used as `image_link`.

**Pattern**: `https://ergoaurashop.com/images/products/{encoded_folder}/{encoded_filename}`

Where folders map per `SLUG_TO_FOLDER`:

- Generic products: `images/products/{folder_name}/{image}`
- Nested (Part-2/...): `images/products/Part-2/{subfolder}/{image}`

The `encodePath()` function in the codebase handles segment-by-segment URI encoding.

## Execution

A Node.js script should be written to:

1. Define all product data inline (mapped from `src/lib/products-data.ts`, `s23-ultra-data.ts`, `iphone-15-pro-max-data.ts`, `worldcup-2026-data.ts`)
2. Construct the CSV rows with proper escaping (RFC 4180 compliant)
3. Preserve the existing header row (# comments) and column header row
4. Replace the sample row (row 3) with all 14 product rows
5. Write to `D:\ergoaurashop.com\catalog_products.csv`

### CSV Construction Notes

- Fields containing commas, newlines, or quotes must be properly quoted
- Use `"` to wrap fields and `""` to escape inner quotes
- Use `\r\n` line endings for Windows compatibility
- INR prices formatted as `XXX.XX INR` with 2 decimal places
- All products currently in stock — `availability` = "in stock"
- All products are new — `condition` = "new"
