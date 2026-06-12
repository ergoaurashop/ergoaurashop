# Supabase Complete SQL Schema for ErgoAura Shop

Copy and run each numbered section **in order** in the Supabase SQL Editor (Dashboard > SQL Editor > New Query).

---

## Section 1: Enable Extensions

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

---

## Section 2: Create All Tables

Run this entire block:

```sql
-- 2a. profiles - linked to Supabase Auth
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE,
  phone       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2b. products
CREATE TABLE IF NOT EXISTS products (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                TEXT NOT NULL,
  slug                TEXT NOT NULL UNIQUE,
  description         TEXT,
  price               INTEGER NOT NULL,
  original_price      INTEGER NOT NULL,
  discount_percentage INTEGER NOT NULL DEFAULT 0,
  category            TEXT,
  images              TEXT[] DEFAULT '{}',
  stock               INTEGER NOT NULL DEFAULT 0,
  features            TEXT[] DEFAULT '{}',
  specifications      JSONB DEFAULT '{}',
  is_active           BOOLEAN NOT NULL DEFAULT true,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2c. orders
CREATE TABLE IF NOT EXISTS orders (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id            TEXT NOT NULL UNIQUE,
  track_id            TEXT NOT NULL UNIQUE,
  user_id             UUID REFERENCES profiles(id) ON DELETE SET NULL,
  customer_name       TEXT NOT NULL,
  customer_email      TEXT NOT NULL,
  customer_phone      TEXT NOT NULL,
  address             JSONB NOT NULL,
  products            JSONB NOT NULL,
  subtotal            INTEGER NOT NULL,
  discount            INTEGER NOT NULL DEFAULT 0,
  shipping            INTEGER NOT NULL DEFAULT 0,
  total               INTEGER NOT NULL,
  payment_id          TEXT,
  payment_status      TEXT NOT NULL DEFAULT 'pending'
                        CHECK (payment_status IN ('pending','paid','failed','refunded')),
  order_status        TEXT NOT NULL DEFAULT 'placed'
                        CHECK (order_status IN ('placed','confirmed','shipped','out_for_delivery','delivered','cancelled')),
  notes               TEXT,
  placed_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  confirmed_at        TIMESTAMPTZ,
  shipped_at          TIMESTAMPTZ,
  out_for_delivery_at TIMESTAMPTZ,
  delivered_at        TIMESTAMPTZ,
  cancelled_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2d. order_status_history - audit log
CREATE TABLE IF NOT EXISTS order_status_history (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  from_status TEXT,
  to_status   TEXT NOT NULL,
  changed_by  TEXT NOT NULL DEFAULT 'system',
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2e. reviews
CREATE TABLE IF NOT EXISTS reviews (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id       UUID REFERENCES profiles(id) ON DELETE SET NULL,
  user_name     TEXT NOT NULL,
  rating        INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title         TEXT,
  comment       TEXT,
  images        TEXT[] DEFAULT '{}',
  is_verified   BOOLEAN NOT NULL DEFAULT false,
  helpful_count INTEGER NOT NULL DEFAULT 0,
  is_approved   BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2f. contact_messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  subject     TEXT,
  message     TEXT NOT NULL,
  is_read     BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## Section 3: Create Functions

Run this entire block:

```sql
-- 3a. Generate 12-char alphanumeric Track ID
CREATE OR REPLACE FUNCTION generate_track_id()
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
  chars  TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i      INT;
BEGIN
  FOR i IN 1..12 LOOP
    result := result || substr(chars, floor(random() * 36 + 1)::INT, 1);
  END LOOP;
  RETURN result;
END;
$$;

-- 3b. Generate readable Order ID (ORD-XXXXXXXX)
CREATE OR REPLACE FUNCTION generate_order_id()
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
  ts   TEXT := to_hex(floor(extract(epoch FROM now()) * 1000)::BIGINT);
  rand TEXT := upper(substr(md5(random()::TEXT), 1, 4));
BEGIN
  RETURN 'ORD-' || upper(ts) || rand;
END;
$$;

-- 3c. Generic trigger to auto-update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;
```

---

## Section 4: Create Triggers

Run this entire block:

```sql
-- 4a. Auto-set order_id and track_id before insert
CREATE OR REPLACE FUNCTION set_order_ids()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.order_id := generate_order_id();
  NEW.track_id := generate_track_id();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_set_order_ids ON orders;
CREATE TRIGGER trg_set_order_ids
  BEFORE INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION set_order_ids();

-- 4b. Log every status change to order_status_history
CREATE OR REPLACE FUNCTION log_order_status_change()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF OLD.order_status IS DISTINCT FROM NEW.order_status THEN
    INSERT INTO order_status_history (order_id, from_status, to_status, changed_by)
    VALUES (NEW.id, OLD.order_status, NEW.order_status, 'admin');
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_log_order_status ON orders;
CREATE TRIGGER trg_log_order_status
  AFTER UPDATE OF order_status ON orders
  FOR EACH ROW EXECUTE FUNCTION log_order_status_change();

-- 4c. Auto-set timestamp when order status changes
CREATE OR REPLACE FUNCTION set_order_status_timestamp()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.order_status = 'confirmed' AND (OLD.order_status IS DISTINCT FROM 'confirmed') THEN
    NEW.confirmed_at := NOW();
  ELSIF NEW.order_status = 'shipped' THEN
    NEW.shipped_at := NOW();
  ELSIF NEW.order_status = 'out_for_delivery' THEN
    NEW.out_for_delivery_at := NOW();
  ELSIF NEW.order_status = 'delivered' THEN
    NEW.delivered_at := NOW();
  ELSIF NEW.order_status = 'cancelled' THEN
    NEW.cancelled_at := NOW();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_set_order_timestamps ON orders;
CREATE TRIGGER trg_set_order_timestamps
  BEFORE UPDATE OF order_status ON orders
  FOR EACH ROW EXECUTE FUNCTION set_order_status_timestamp();

-- 4d. Auto-update updated_at on profiles
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON profiles;
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 4e. Auto-update updated_at on products
DROP TRIGGER IF EXISTS trg_products_updated_at ON products;
CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 4f. Auto-update updated_at on orders
DROP TRIGGER IF EXISTS trg_orders_updated_at ON orders;
CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## Section 5: Create Indexes

Run this entire block:

```sql
-- Profiles
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON profiles(phone);

-- Products
CREATE INDEX IF NOT EXISTS idx_products_slug     ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_active   ON products(is_active);

-- Orders - CRITICAL for search performance
CREATE INDEX IF NOT EXISTS idx_orders_track_id         ON orders(track_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_id         ON orders(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone   ON orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email   ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_user_id          ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status   ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_order_status     ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_placed_at        ON orders(placed_at DESC);

-- Order status history
CREATE INDEX IF NOT EXISTS idx_status_history_order ON order_status_history(order_id);

-- Reviews
CREATE INDEX IF NOT EXISTS idx_reviews_product  ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved);

-- Contact messages
CREATE INDEX IF NOT EXISTS idx_contact_read ON contact_messages(is_read);
```

---

## Section 6: Enable Row Level Security

Run this block:

```sql
ALTER TABLE profiles            ENABLE ROW LEVEL SECURITY;
ALTER TABLE products            ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders              ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews             ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages    ENABLE ROW LEVEL SECURITY;
```

---

## Section 7: Create RLS Policies

Run this entire block:

```sql
-- === 7a. Profiles ===
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Service role can insert profiles"
  ON profiles FOR INSERT WITH CHECK (true);

-- === 7b. Products ===
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT USING (is_active = true);

-- === 7c. Orders ===
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (user_id = auth.uid() OR customer_email = auth.email());

CREATE POLICY "Anyone can lookup order by track_id"
  ON orders FOR SELECT USING (true);

-- === 7d. Order Status History ===
CREATE POLICY "Anyone can view status history for their order"
  ON order_status_history FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_status_history.order_id
    AND (orders.user_id = auth.uid() OR orders.customer_email = auth.email())
  ));

CREATE POLICY "Trigger can insert status history"
  ON order_status_history FOR INSERT WITH CHECK (true);

-- === 7e. Reviews ===
CREATE POLICY "Anyone can read approved reviews"
  ON reviews FOR SELECT USING (is_approved = true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- === 7f. Contact Messages ===
CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages FOR INSERT WITH CHECK (true);
```

---

## Section 8: Seed Product Data (All 11 Products)

Run this entire block:

```sql
INSERT INTO products (id, name, slug, description, price, original_price, discount_percentage, category, images, stock, features, specifications, is_active, created_at)
VALUES
(
  'a0000000-0000-0000-0000-000000000001',
  'Anti-Snoring Chin Strap',
  'anti-snoring-chin-strap',
  'Gently supports your jaw to keep airways open while you sleep -- most users see reduced snoring from the very first night. Made from ultra-soft, breathable, skin-friendly stretch fabric with adjustable velcro straps.',
  99, 198, 50, 'wellness',
  ARRAY['713s6nBocOL._AC_SX679_.jpg','71J7WCcLYrL._AC_SX679_.jpg','61scJnV6E-L._AC_SX679_.jpg','61XQvLpMfpL._AC_SX679_.jpg','71mznW03Z6L._AC_SX679_.jpg','71Uhi+rYZNL._AC_SX679_.jpg','71YcArmgXUL._AC_SX679_.jpg','videoframe_6701.png'],
  50,
  ARRAY['Soft & breathable stretch fabric -- no irritation even after 8 hours','Adjustable universal fit for most adult face shapes','Slips on in 5 seconds -- no batteries or complicated setup','Lightweight (50 g) and travel-friendly','7-day no-questions return policy'],
  '{"Material": "Soft breathable stretch fabric", "Size": "One size fits most adults (adjustable)", "Weight": "50 g", "Care": "Hand wash with mild soap, air dry", "Colour": "Black / Dark grey"}'::JSONB,
  true, '2025-01-01T00:00:00Z'
),
(
  'a0000000-0000-0000-0000-000000000002',
  'Blackhead Remover Vacuum Tool',
  'blackhead-remover-vacuum-tool',
  'Safely clear blackheads and unclog pores with gentle suction. Features 5 interchangeable suction heads, USB rechargeable battery, and adjustable suction levels for all skin types.',
  199, 355, 44, 'personal-care',
  ARRAY['71UD1hZ6dEL._SL1500_.jpg','51GX34Y6rBL._SX679_.jpg','61FqTSjngEL._SL1500_.jpg','61g7pE6PkOL._SL1500_.jpg','61uM4gsQqML._SL1500_.jpg','71QZVdPJ+yL._SL1500_.jpg','717f90hhyfL._SL1500_.jpg'],
  40,
  ARRAY['5 interchangeable suction heads for different skin areas','USB rechargeable -- no batteries needed','Adjustable suction levels for sensitive to deep cleansing','LCD display shows suction level & battery','Gentle on skin -- reduces redness vs manual extraction'],
  '{"Material": "ABS + Silicone", "Suction Heads": "5 interchangeable tips", "Battery": "300 mAh (USB rechargeable)", "Charging Time": "1.5 hours", "Waterproof Rating": "IPX6"}'::JSONB,
  true, '2025-01-02T00:00:00Z'
),
(
  'a0000000-0000-0000-0000-000000000003',
  'Eye Massager Sleep Mask',
  'eye-massager-sleep-mask',
  'Relieve tired eyes with soothing heat and vibration massage. Features 5 massage modes, built-in Bluetooth music, foldable design, and rechargeable battery for relaxation anywhere.',
  799, 1332, 40, 'wellness',
  ARRAY['71buUGZPyGL._SL1500_.jpg','715zY+gU7mL._SL1500_.jpg','71GluIfTU6L._SL1500_.jpg','71hzVF4EzGL._SL1500_.jpg','71phq6UFSCL._SL1500_.jpg','71t+c1kTBZL._SL1500_.jpg','71XwXWvRypL._SL1500_.jpg','81P7fDd4NxL._SL1500_.jpg'],
  25,
  ARRAY['5 massage modes (heat, vibration, compression, music sync)','Built-in Bluetooth speaker -- play calming music while you relax','Foldable & lightweight design for travel','USB rechargeable with 5+ hours of battery life','Adjustable strap fits all head sizes'],
  '{"Material": "Breathable memory foam + PU leather", "Modes": "5 (Heat, Vibration, Compression, Music, Combo)", "Battery": "500 mAh (USB-C rechargeable)", "Battery Life": "5+ hours", "Weight": "210 g"}'::JSONB,
  true, '2025-01-03T00:00:00Z'
),
(
  'a0000000-0000-0000-0000-000000000004',
  'Foot Massage Roller (Spiked)',
  'foot-massage-roller-spiked',
  'Relax tired feet instantly with acupressure spikes that stimulate pressure points. Ideal for heel pain, plantar fasciitis relief, and improving blood circulation after long days.',
  269, 498, 46, 'wellness',
  ARRAY['71C6y5PaQcL._SL1024_.jpg','51DCC5qK4tL._SL1024_.jpg','615MQIhrGHL._SL1024_.jpg','61m8g2w4PvL._SL1024_.jpg','61pCypom1FL._SL1024_.jpg','61YrHxn0EML._SL1024_.jpg','71nUphLK0oL._SL1024_.jpg'],
  35,
  ARRAY['Spiked acupressure surface targets key foot pressure points','Provides deep tissue massage for plantar fasciitis relief','Improves blood circulation and reduces foot fatigue','Durable ABS construction with non-slip texture','Lightweight and portable -- use at home or office'],
  '{"Material": "ABS plastic with acupressure spikes", "Dimensions": "25 cm x 8 cm", "Weight": "250 g", "Max Load": "120 kg", "Use": "Home, office, gym, travel"}'::JSONB,
  true, '2025-01-04T00:00:00Z'
),
(
  'a0000000-0000-0000-0000-000000000005',
  'Kitchen Sink Drain Hair Catcher',
  'kitchen-sink-drain-hair-catcher',
  'Stop clogged drains with this adhesive mesh roll. Simply stick it over your drain -- it catches hair, food debris, and gunk while letting water flow through freely. Each application lasts up to 6 weeks.',
  189, 291, 35, 'kitchen',
  ARRAY['81K4FfOClhL._SL1500_.jpg','71CS2cGV1VL._SL1500_.jpg','71OOgmOO6JL._SL1500_.jpg','71OPTuvcqiL._SL1500_.jpg','71QPoJSRjWL._SL1500_.jpg','71UGLGSVhOL._SL1500_.jpg','81dD5bagqGL._SL1500_.jpg','81hk6x44btL._SL1500_.jpg','81hW4gJrMiL._SL1500_.jpg'],
  60,
  ARRAY['Adhesive mesh design -- no tools, no installation needed','Catches hair, food scraps, and debris before they clog pipes','Cuttable to fit any drain size (sink, shower, tub)','Lasts up to 6 weeks per application','Transparent -- nearly invisible when applied'],
  '{"Material": "Adhesive mesh film", "Roll Size": "300 cm x 10 cm (cut to size)", "Per Application": "Lasts 4-6 weeks", "Suitable For": "Kitchen sinks, bathroom sinks, showers, tubs", "Pack Includes": "1 roll"}'::JSONB,
  true, '2025-01-05T00:00:00Z'
),
(
  'a0000000-0000-0000-0000-000000000006',
  'Magnetic USB Cable 3-in-1',
  'magnetic-usb-cable-3-in-1',
  'Charge your smartwatch, phone, and earbuds with one magnetic cable. Features 3 interchangeable tips (Apple Watch, Micro USB, USB-C) and fast charging support. 1 meter length.',
  145, 250, 42, 'accessories',
  ARRAY['71K28ltxwML._SL1000_.jpg','410L7EcP-QL._SL1500_.jpg','41bYWVE1yLL._SL1000_.jpg','41gwMn6x3aL._SL1500_.jpg','41N6lAWqO0L._SL1500_.jpg','51h2Uhwb5HL._SL1000_.jpg','51TAiQT4T9L._SL1000_.jpg','61LhXA9czEL._SL1000_.jpg'],
  55,
  ARRAY['3 interchangeable magnetic tips (Apple Watch, Micro USB, USB-C)','Magnetic auto-attach -- aligns perfectly every time','Fast charging supported (2A output)','Durable braided nylon cable resists tangling','LED indicator shows charging status'],
  '{"Length": "1 meter", "Cable Material": "Braided nylon", "Input Type": "USB-A", "Output Tips": "Apple Watch / Micro USB / USB-C", "Max Output": "2A (fast charging)"}'::JSONB,
  true, '2025-01-06T00:00:00Z'
),
(
  'a0000000-0000-0000-0000-000000000007',
  'Menstrual Heating Pad (USB)',
  'menstrual-heating-pad-usb',
  'Ease period pain naturally with this USB heating and massage pad. Features 3 heat levels and 3 vibration modes, cordless rechargeable battery, and a soft flexible design that stays in place.',
  399, 767, 48, 'wellness',
  ARRAY['4c1fa16d-e3f6-47e2-bc36-ddb1ad6125ab.avif','567a9f6a-bb34-4b67-aaa0-f85b200bd71b.avif','5fe65003-eb2e-4a69-8234-bed1d6b7a144.avif','85bc355e-4994-11f0-b974-0a580a634d11.avif','87d46062-f94f-4b3a-a326-20736ade87af.avif','d479d970-a4ab-42a1-9c51-553ac1eefb91.avif','ef012fbd-2b12-49ac-956b-fdde201e25f8.avif','f27ed9de-6e7e-499b-aa2e-9b5f59889982.avif'],
  30,
  ARRAY['3 adjustable heat levels (35 C - 65 C) for targeted relief','3 vibration massage modes to soothe cramps','Cordless and rechargeable -- no wires while wearing','Soft, flexible fabric hugs your body comfortably','USB-C charging with 6+ hours of heat on low setting'],
  '{"Material": "Soft polyester + carbon fiber heating element", "Heat Levels": "3 (35C / 45C / 65C)", "Massage Modes": "3 vibration patterns", "Battery": "2000 mAh (USB-C rechargeable)", "Battery Life": "6+ hours on low"}'::JSONB,
  true, '2025-01-07T00:00:00Z'
),
(
  'a0000000-0000-0000-0000-000000000008',
  'Posture Corrector Belt',
  'posture-corrector-belt',
  'Fix your posture naturally with this breathable back support belt. Adjustable straps gently pull shoulders back, align your spine, and relieve back pain from poor posture. Comfortable for all-day wear.',
  279, 507, 45, 'wellness',
  ARRAY['na-posture-corrector-magnetic-back-support-belt-shoulder-for-original-imah9chaghghhran.webp','3ccd9b87-f8c5-4ecc-9f0e-a84b0dfff3ad.avif','70837e82-fe26-4a7c-9743-8bb9ef3288cb.avif','9c85db66-403b-47f7-b202-897b0a7e8658.avif','afeafd61-1fb8-4745-867f-fb0d35fce8d6.avif','BS63-1.webp','c8ee076a-c889-4ba9-943b-02e203f4fbb1.avif'],
  45,
  ARRAY['Dual-strap design gently pulls shoulders into proper alignment','Breathable neoprene material -- won''t overheat during long wear','Adjustable fit for men and women (chest 30-50 inches)','Helps relieve upper back, shoulder, and neck pain','Discreet -- fits under clothing without bulging'],
  '{"Material": "Breathable neoprene + elastic straps", "Chest Size": "30-50 inches (adjustable)", "Weight": "150 g", "Use": "Office work, driving, gaming, daily wear", "Care": "Hand wash, air dry"}'::JSONB,
  true, '2025-01-08T00:00:00Z'
),
(
  'a0000000-0000-0000-0000-000000000009',
  'Silicone Oil Splatter Guard',
  'silicone-oil-splatter-guard',
  'Stop oil splatters while frying! This flexible silicone mesh guard fits all pans and kadais. Food-grade silicone with fine mesh that lets steam escape while blocking oil splatters. Dishwasher safe.',
  179, 298, 40, 'kitchen',
  ARRAY['81He5w+zsBL._AC_SX679_.jpg','61BSr5zTGTL._AC_SX679_.jpg','71CJiccJoOL._AC_SX679_.jpg','71MnzyjNAZL._AC_SX679_.jpg','71oRvYZ0wiL._AC_SX679_.jpg','81gm-o-sL-L._AC_SX679_.jpg','81vb7Kl7RZL._AC_SX679_.jpg'],
  50,
  ARRAY['Fine silicone mesh blocks oil splatters while letting steam escape','Flexible design fits round pans & kadais (16-30 cm diameter)','Food-grade silicone -- BPA-free, non-toxic, heat resistant to 230 C','Dishwasher safe for easy cleaning','Built-in weight ring keeps it stable on the pan'],
  '{"Material": "Food-grade silicone (BPA-free)", "Pan Size": "Fits 16-30 cm diameter pans & kadais", "Heat Resistance": "Up to 230C", "Cleaning": "Dishwasher safe or hand wash", "Colour": "Red / Grey"}'::JSONB,
  true, '2025-01-09T00:00:00Z'
),
(
  'a0000000-0000-0000-0000-000000000010',
  'Waterproof Phone Pouch (Pack of 2)',
  'waterproof-phone-pouch',
  'Keep your phone dry underwater, at the beach, or in the rain. This pack of 2 pouches fits all phones up to 7 inches, with a secure triple-lock seal and detachable lanyard for hands-free carrying.',
  129, 287, 55, 'accessories',
  ARRAY['81AKrS3Nf8L._AC_SL1500_.jpg','71VJgi2YfvL._AC_SL1500_.jpg','71xb2c4ykNL._AC_SL1500_.jpg','71YyuYMG1HL._AC_SL1500_.jpg','71zvzYEFsmL._AC_SL1500_.jpg','81dGgyfFFeL._AC_SL1500_.jpg'],
  70,
  ARRAY['Triple-lock waterproof seal -- IPX8 certified, submersible to 30m','Fits all phones up to 7 inches (even with cases)','Pack of 2 -- share with a friend or keep a spare','Detachable lanyard for hands-free wearing','Touchscreen compatible -- use your phone underwater'],
  '{"Material": "Clear TPU + PVC", "Max Phone Size": "Up to 7 inches", "Waterproof Rating": "IPX8 (submersible to 30m)", "Pack Includes": "2 pouches + 2 lanyards", "Use": "Swimming, beach, rain, hiking, travel"}'::JSONB,
  true, '2025-01-10T00:00:00Z'
),
(
  'a0000000-0000-0000-0000-000000000011',
  'Waterproof Shoe Covers',
  'waterproof-shoe-covers',
  'Keep your shoes dry in rain and mud. These reusable waterproof shoe covers feature anti-slip rubber soles, elastic cuffs, and a lightweight design that folds into your bag. One size fits most adults.',
  99, 198, 50, 'accessories',
  ARRAY['51iqWsou8wL.jpg','41GVwI-6O9L._SY625_.jpg','51nH48JYAEL.jpg','51vmU9IGATL.jpg','51ZZLnvjhvL.jpg','616sjI+bQ6L.jpg','videoframe_8838.png'],
  65,
  ARRAY['Waterproof outer layer keeps shoes completely dry','Anti-slip rubber sole for safe walking on wet surfaces','Elastic ankle cuff with drawstring -- secure, no slipping','Folds compactly into included carry pouch','Reusable -- rinse clean and air dry after each use'],
  '{"Material": "Waterproof polyester + rubber sole", "Size": "One size fits most adults (EU 36-46 / UK 3-11)", "Weight": "120 g per pair", "Pack Includes": "1 pair + carry pouch", "Use": "Rain, hiking, camping, travel, festivals"}'::JSONB,
  true, '2025-01-11T00:00:00Z'
)
ON CONFLICT (slug) DO NOTHING;
```

---

## Section 9: Seed Sample Orders (For Testing Admin Dashboard)

Run this block if you want test data in the admin dashboard:

```sql
-- Sample order 1: Delivered
INSERT INTO orders (
  customer_name, customer_email, customer_phone,
  address, products, subtotal, discount, shipping, total,
  payment_id, payment_status, order_status,
  placed_at, shipped_at, out_for_delivery_at, delivered_at
) VALUES (
  'Ravi Sharma', 'ravi.sharma@email.com', '+919876543210',
  '{"line1": "42, MG Road", "line2": "Indiranagar", "city": "Bangalore", "state": "Karnataka", "pincode": "560038"}'::JSONB,
  '[{"product_id": "a0000000-0000-0000-0000-000000000001", "name": "Anti-Snoring Chin Strap", "price": 99, "quantity": 2, "image": "/images/products/Anti-snoring chin strap/713s6nBocOL._AC_SX679_.jpg"}]'::JSONB,
  198, 0, 0, 198,
  'pay_sample_delivered_001', 'paid', 'delivered',
  NOW() - INTERVAL '40 days',
  NOW() - INTERVAL '30 days',
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '1 day'
);

-- Sample order 2: Shipped
INSERT INTO orders (
  customer_name, customer_email, customer_phone,
  address, products, subtotal, discount, shipping, total,
  payment_id, payment_status, order_status,
  placed_at, shipped_at
) VALUES (
  'Priya Patel', 'priya.p@email.com', '+919871234567',
  '{"line1": "7, Sarojini Nagar", "city": "Delhi", "state": "Delhi", "pincode": "110023"}'::JSONB,
  '[{"product_id": "a0000000-0000-0000-0000-000000000003", "name": "Eye Massager Sleep Mask", "price": 799, "quantity": 1, "image": "/images/products/Eye massager sleep mask/71buUGZPyGL._SL1500_.jpg"}]'::JSONB,
  799, 0, 0, 799,
  'pay_sample_shipped_002', 'paid', 'shipped',
  NOW() - INTERVAL '15 days',
  NOW() - INTERVAL '3 days'
);

-- Sample order 3: Placed (pending)
INSERT INTO orders (
  customer_name, customer_email, customer_phone,
  address, products, subtotal, discount, shipping, total,
  payment_status, order_status,
  placed_at
) VALUES (
  'Amit Kumar', 'amit.k@email.com', '+919812345678',
  '{"line1": "55, Lake View Apartments", "city": "Mumbai", "state": "Maharashtra", "pincode": "400001"}'::JSONB,
  '[{"product_id": "a0000000-0000-0000-0000-000000000007", "name": "Menstrual Heating Pad (USB)", "price": 399, "quantity": 1, "image": "/images/products/Menstrual heating pad (USB)/4c1fa16d-e3f6-47e2-bc36-ddb1ad6125ab.avif"}, {"product_id": "a0000000-0000-0000-0000-000000000008", "name": "Posture Corrector Belt", "price": 279, "quantity": 1, "image": "/images/products/Posture corrector belt/na-posture-corrector-magnetic-back-support-belt-shoulder-for-original-imah9chaghghhran.webp"}]'::JSONB,
  678, 0, 49, 727,
  'pending', 'placed',
  NOW() - INTERVAL '2 days'
);

-- Sample order 4: B2G1 discount applied, confirmed
INSERT INTO orders (
  customer_name, customer_email, customer_phone,
  address, products, subtotal, discount, shipping, total,
  payment_id, payment_status, order_status,
  placed_at
) VALUES (
  'Sneha Reddy', 'sneha.r@email.com', '+918765432109',
  '{"line1": "12, Jubilee Hills", "line2": "Road No. 36", "city": "Hyderabad", "state": "Telangana", "pincode": "500033"}'::JSONB,
  '[{"product_id": "a0000000-0000-0000-0000-000000000010", "name": "Waterproof Phone Pouch (Pack of 2)", "price": 129, "quantity": 3, "image": "/images/products/Waterproof Phone Pouch/81AKrS3Nf8L._AC_SL1500_.jpg"}]'::JSONB,
  387, 129, 0, 258,
  'pay_sample_b2g1_004', 'paid', 'confirmed',
  NOW() - INTERVAL '5 days'
);

-- Sample order 5: Failed payment
INSERT INTO orders (
  customer_name, customer_email, customer_phone,
  address, products, subtotal, discount, shipping, total,
  payment_id, payment_status, order_status,
  placed_at
) VALUES (
  'Vikram Singh', 'vikram.s@email.com', '+919999888777',
  '{"line1": "8, Civil Lines", "city": "Jaipur", "state": "Rajasthan", "pincode": "302006"}'::JSONB,
  '[{"product_id": "a0000000-0000-0000-0000-000000000002", "name": "Blackhead Remover Vacuum Tool", "price": 199, "quantity": 1, "image": "/images/products/Blackhead remover vacuum tool/71UD1hZ6dEL._SL1500_.jpg"}]'::JSONB,
  199, 0, 49, 248,
  'pay_sample_failed_005', 'failed', 'placed',
  NOW() - INTERVAL '1 day'
);
```

---

## Important: Admin Authentication via Environment Variables

Admin access to the dashboard is handled **entirely through environment variables**, not the database:

1. **Login credentials**: [`ADMIN_USERNAME`](src/lib/constants.ts:51) and [`ADMIN_PASSWORD`](src/lib/constants.ts:52) are read from `.env.local`
2. **Data access**: Once logged in, the admin dashboard uses the Supabase **service role key** ([`supabaseAdmin`](src/lib/supabase/admin.ts:4)) which bypasses Row Level Security
3. **No database changes needed**: You do NOT need to run any SQL to "make yourself admin"

### If you already ran the old schema (with `is_admin` column)

Run this to clean up the old admin infrastructure:

```sql
-- Drop the is_admin() function and ALL dependent RLS policies (6 policies)
DROP FUNCTION IF EXISTS is_admin() CASCADE;

-- Drop the is_admin column from profiles
ALTER TABLE profiles DROP COLUMN IF EXISTS is_admin;
```

Then run the **Verification Queries** section below to confirm everything is clean.

---

## Execution Checklist

| #   | Section                | What it does                       | Estimated rows affected |
| --- | ---------------------- | ---------------------------------- | ----------------------- |
| 1   | Extensions             | Enables UUID generation            | 0                       |
| 2   | Create Tables          | Creates 6 tables                   | 0                       |
| 3   | Functions              | Creates 3 SQL functions            | 0                       |
| 4   | Triggers               | Creates 6 triggers for automation  | 0                       |
| 5   | Indexes                | Creates 14 indexes for performance | 0                       |
| 6   | Enable RLS             | Turns on row-level security        | 0                       |
| 7   | RLS Policies           | Creates 10 security policies       | 0                       |
| 8   | Seed Products          | Inserts all 11 products            | 11 rows                 |
| 9   | Seed Orders (optional) | Inserts 5 sample orders            | 5 rows                  |

---

## Verification Queries — Run After All Sections to Confirm Correct Setup

Run these SELECT queries in the SQL Editor **after** executing Sections 1-9 to verify everything is set up correctly.

```sql
-- ============================================================
-- VERIFICATION 1: Check all 6 tables exist
-- ============================================================
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- ============================================================
-- VERIFICATION 2: Check profiles table columns (no is_admin)
-- ============================================================
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'profiles'
ORDER BY ordinal_position;

-- ============================================================
-- VERIFICATION 3: Check orders table has all required columns
-- ============================================================
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'orders'
ORDER BY ordinal_position;

-- ============================================================
-- VERIFICATION 4: Check all 3 functions exist
-- ============================================================
SELECT routine_name
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_type = 'FUNCTION'
ORDER BY routine_name;

-- ============================================================
-- VERIFICATION 5: Check all 6 triggers exist
-- ============================================================
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY trigger_name;

-- ============================================================
-- VERIFICATION 6: Check all key indexes exist
-- ============================================================
SELECT indexname, tablename
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('orders', 'products', 'profiles')
ORDER BY tablename, indexname;

-- ============================================================
-- VERIFICATION 7: Check RLS is enabled on all 6 tables
-- ============================================================
SELECT relname AS table_name, relrowsecurity AS rls_enabled
FROM pg_class
WHERE relname IN ('profiles','products','orders','order_status_history','reviews','contact_messages')
ORDER BY relname;

-- ============================================================
-- VERIFICATION 8: Check all 10 RLS policies exist
-- ============================================================
SELECT schemaname, tablename, policyname, permissive, roles
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ============================================================
-- VERIFICATION 9: Check 11 products were seeded correctly
-- ============================================================
SELECT COUNT(*) AS product_count FROM products;
SELECT slug, name, price, original_price, is_active FROM products ORDER BY slug;

-- ============================================================
-- VERIFICATION 10: Check sample orders (if Section 9 was run)
-- ============================================================
SELECT order_id, track_id, customer_name, order_status, payment_status
FROM orders ORDER BY placed_at DESC;

-- ============================================================
-- VERIFICATION 11: Check order_status_history trigger works
-- (If Section 9 was run, update an order status to test)
-- ============================================================
SELECT COUNT(*) AS history_entries FROM order_status_history;

-- ============================================================
-- VERIFICATION 12: Check extensions are enabled
-- ============================================================
SELECT extname, extversion FROM pg_extension WHERE extname IN ('pgcrypto', 'uuid-ossp');

-- ============================================================
-- VERIFICATION 13: Summary Report — All Checks in One View
-- ============================================================
SELECT 'Tables' AS check_name, COUNT(*)::TEXT AS status FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
UNION ALL
SELECT 'Functions', COUNT(*)::TEXT FROM information_schema.routines WHERE routine_schema = 'public' AND routine_type = 'FUNCTION'
UNION ALL
SELECT 'Triggers', COUNT(*)::TEXT FROM information_schema.triggers WHERE trigger_schema = 'public'
UNION ALL
SELECT 'RLS Policies', COUNT(*)::TEXT FROM pg_policies WHERE schemaname = 'public'
UNION ALL
SELECT 'Products Seeded', COUNT(*)::TEXT FROM products
UNION ALL
SELECT 'Orders Seeded', COUNT(*)::TEXT FROM orders;
```
