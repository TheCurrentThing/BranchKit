-- Track which kit_category the homepage_content row was seeded for.
-- Null means the row predates this column (legacy — content is trusted as-is).
-- A non-null value that doesn't match the business's current kit_category
-- signals stale content and triggers a fallback to category defaults at read time.

ALTER TABLE homepage_content
  ADD COLUMN IF NOT EXISTS kit_category text;
