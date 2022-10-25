DROP TABLE IF EXISTS stripe_event CASCADE;

CREATE TABLE stripe_event (
    stripe_event_id text PRIMARY KEY,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE stripe_event ENABLE ROW LEVEL SECURITY;
