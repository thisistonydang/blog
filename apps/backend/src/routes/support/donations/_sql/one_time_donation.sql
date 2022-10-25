DROP TABLE IF EXISTS one_time_donation CASCADE;

CREATE TABLE one_time_donation (
    one_time_donation_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name citext NOT NULL,
    email citext NOT NULL,
    display_name citext NOT NULL,
    amount integer NOT NULL
);

ALTER TABLE one_time_donation ENABLE ROW LEVEL SECURITY;
