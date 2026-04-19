-- Migration: 009_kit_family_category.sql
--
-- Introduces kit_family + kit_category columns to support the new
-- Kit Family → Category/Subtype → Module architecture.
--
-- Transition strategy:
--   • kit_type is kept intact — existing code continues to work
--   • kit_family and kit_category are added and backfilled from kit_type
--   • New businesses set all three columns
--   • kit_type constraint is expanded to include new Food Service categories
--   • kit_type will be formally deprecated in a future migration once all
--     callers have migrated to kit_category

BEGIN;

-- ── Add kit_family column ─────────────────────────────────────────────────────

ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS kit_family text NOT NULL DEFAULT 'food_service'
  CHECK (kit_family IN ('food_service', 'creative', 'services', 'retail'));

COMMENT ON COLUMN businesses.kit_family IS
  'Kit family — broad operational backbone. '
  'food_service: cafes, diners, restaurants, pop-ups, food trucks, bars. '
  'creative: artists, studios. services: trades, contractors. '
  'Derived from kit_category; stored for efficient querying.';

-- ── Add kit_category column ────────────────────────────────────────────────────

ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS kit_category text NOT NULL DEFAULT 'restaurant'
  CHECK (kit_category IN (
    -- Food Service family
    'cafe', 'diner', 'restaurant', 'pop_up', 'food_truck', 'bar',
    -- Creative family
    'artist',
    -- Services family
    'trade'
  ));

COMMENT ON COLUMN businesses.kit_category IS
  'Kit category — business subtype/preset within its family. '
  'Drives module defaults and section order. Set at onboarding. '
  'Authoritative replacement for kit_type (kept for backward compat).';

-- ── Backfill kit_family + kit_category from existing kit_type values ──────────

UPDATE businesses SET
  kit_family = CASE kit_type
    WHEN 'restaurant' THEN 'food_service'
    WHEN 'food_truck' THEN 'food_service'
    WHEN 'artist'     THEN 'creative'
    WHEN 'trade'      THEN 'services'
    ELSE 'food_service'
  END,
  kit_category = CASE kit_type
    WHEN 'restaurant' THEN 'restaurant'
    WHEN 'food_truck' THEN 'food_truck'
    WHEN 'artist'     THEN 'artist'
    WHEN 'trade'      THEN 'trade'
    ELSE 'restaurant'
  END
WHERE kit_type IN ('restaurant', 'food_truck', 'artist', 'trade');

-- ── Expand kit_type constraint to accept new Food Service categories ────────────
-- Allows kit_type to be set to the category value for new businesses, keeping
-- it as a transitional alias for kit_category.

ALTER TABLE businesses DROP CONSTRAINT IF EXISTS businesses_kit_type_check;
ALTER TABLE businesses ADD CONSTRAINT businesses_kit_type_check
  CHECK (kit_type IN (
    'restaurant', 'food_truck', 'artist', 'trade',
    'cafe', 'diner', 'pop_up', 'bar'
  ));

COMMIT;
