DROP TABLE IF EXISTS one_time_donation CASCADE;

CREATE TABLE one_time_donation (
    one_time_donation_id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name citext NOT NULL,
    email citext NOT NULL,
    display_name citext NOT NULL,
    amount integer NOT NULL
);

ALTER TABLE one_time_donation ENABLE ROW LEVEL SECURITY;
