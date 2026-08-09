-- ============================================================================
-- MIGRATION: Meta Purchase Reconciliation
-- ============================================================================
-- PURPOSE:
--   Fix the "10 Purchases in Meta but 0 in actual sales" discrepancy caused by
--   UPI payments that are captured, reported as Purchase to Meta, then reversed
--   by the bank later. These columns let us track which orders had a Meta event
--   fired so we can (a) fire Purchase idempotently and (b) send a corrective
--   Meta "Refund" event when a captured payment later fails.
--
-- ORDER OF OPERATIONS (IMPORTANT):
--   1. Run STEP 1 + STEP 2 first (safe, additive, non-breaking).
--   2. Run the STEP 3 diagnostic query.
--   3. If STEP 3 finds duplicates, resolve them (see notes below) BEFORE
--      enabling the unique index in STEP 4.
--   4. Enable STEP 4.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- STEP 1: Add tracking columns (nullable — non-breaking)
-- ----------------------------------------------------------------------------
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS meta_purchase_fired_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS meta_refund_fired_at   TIMESTAMPTZ;

-- ----------------------------------------------------------------------------
-- STEP 2: Index on payment_id (speeds up webhook lookups)
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_orders_payment_id ON orders(payment_id);

-- ----------------------------------------------------------------------------
-- STEP 3: DIAGNOSTIC — check for duplicate payment_ids before unique index
-- ----------------------------------------------------------------------------
-- Run this and review the results:
--
--   SELECT payment_id, COUNT(*) AS cnt
--   FROM orders
--   WHERE payment_id IS NOT NULL
--   GROUP BY payment_id
--   HAVING COUNT(*) > 1;
--
-- If any rows are returned, you MUST resolve them first (keep the oldest /
-- most complete order, delete or merge the duplicates). Example to inspect:
--
--   SELECT id, order_id, payment_id, payment_status, created_at
--   FROM orders
--   WHERE payment_id IN (
--     SELECT payment_id FROM orders
--     WHERE payment_id IS NOT NULL
--     GROUP BY payment_id
--     HAVING COUNT(*) > 1
--   )
--   ORDER BY payment_id, created_at;
--
-- After deduplicating, enable STEP 4.

-- ----------------------------------------------------------------------------
-- STEP 4: Unique index on payment_id (RUN ONLY AFTER STEP 3 IS CLEAN)
-- ----------------------------------------------------------------------------
-- CREATE UNIQUE INDEX IF NOT EXISTS orders_payment_id_unique
--   ON orders(payment_id)
--   WHERE payment_id IS NOT NULL;
