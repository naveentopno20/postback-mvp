
INSERT INTO affiliates (name) VALUES
  ('Alpha Affiliate'),
  ('Beta Partner')
ON CONFLICT DO NOTHING;

INSERT INTO campaigns (name) VALUES
  ('Summer Sale'),
  ('App Install')
ON CONFLICT DO NOTHING;

-- Sample click for quick testing
-- affiliate_id=1, campaign_id=10-ish depends on serials; fetch ids dynamically in seed script below.
