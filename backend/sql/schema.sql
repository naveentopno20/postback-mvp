
-- DROP & CREATE tables (idempotent for local dev)
CREATE TABLE IF NOT EXISTS affiliates (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS campaigns (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS clicks (
  id SERIAL PRIMARY KEY,
  affiliate_id INTEGER NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
  campaign_id INTEGER NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  click_id TEXT NOT NULL,
  ts TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_click UNIQUE (affiliate_id, campaign_id, click_id)
);

-- conversions.click_id references clicks.id (FK to clicks)
CREATE TABLE IF NOT EXISTS conversions (
  id SERIAL PRIMARY KEY,
  click_id INTEGER NOT NULL REFERENCES clicks(id) ON DELETE CASCADE,
  amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
  currency VARCHAR(3) NOT NULL,
  ts TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clicks_aff_click ON clicks (affiliate_id, click_id);
CREATE INDEX IF NOT EXISTS idx_conversions_click ON conversions (click_id);
