CREATE OR REPLACE FUNCTION update_timestamp ()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.modified_at = NOW();
    RETURN NEW;
END;
$$;
