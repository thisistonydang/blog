DROP TABLE IF EXISTS contact CASCADE;

DROP TABLE IF EXISTS mailing_list CASCADE;

CREATE TABLE contact (
    contact_id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name citext NOT NULL,
    preferred_name citext NOT NULL,
    email citext UNIQUE NOT NULL,
    is_verified boolean DEFAULT FALSE NOT NULL,
    is_subscriber boolean DEFAULT FALSE NOT NULL,
    is_banned boolean DEFAULT FALSE NOT NULL,
    mailing_list_id integer DEFAULT 1 NOT NULL
);

CREATE TRIGGER tr_update_timestamp
    BEFORE UPDATE ON contact
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp ();

ALTER TABLE contact ENABLE ROW LEVEL SECURITY;

CREATE TABLE mailing_list (
    mailing_list_id integer PRIMARY KEY,
    mailing_list citext UNIQUE NOT NULL
);

ALTER TABLE mailing_list ENABLE ROW LEVEL SECURITY;

ALTER TABLE contact
    ADD FOREIGN KEY (mailing_list_id) REFERENCES mailing_list (mailing_list_id);
