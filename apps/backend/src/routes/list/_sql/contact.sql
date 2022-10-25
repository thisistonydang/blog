DROP TABLE IF EXISTS mailing_list CASCADE;

DROP TABLE IF EXISTS contact CASCADE;

CREATE TABLE mailing_list (
    mailing_list_id integer PRIMARY KEY,
    mailing_list citext NOT NULL UNIQUE
);

ALTER TABLE mailing_list ENABLE ROW LEVEL SECURITY;

CREATE TABLE contact (
    contact_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name citext NOT NULL,
    preferred_name citext NOT NULL,
    email citext NOT NULL UNIQUE,
    is_verified boolean NOT NULL DEFAULT FALSE,
    is_subscriber boolean NOT NULL DEFAULT FALSE,
    is_banned boolean NOT NULL DEFAULT FALSE,
    mailing_list_id integer NOT NULL DEFAULT 1 REFERENCES mailing_list (mailing_list_id)
);

ALTER TABLE contact ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER tr_update_timestamp
    BEFORE UPDATE ON contact
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp ();
