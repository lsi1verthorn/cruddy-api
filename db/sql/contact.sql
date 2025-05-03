-- Table: job_tracker.contact

-- DROP TABLE IF EXISTS job_tracker.contact;

CREATE TABLE IF NOT EXISTS job_tracker.contact
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    contact_name text COLLATE pg_catalog."default" NOT NULL,
    contact_email text COLLATE pg_catalog."default",
    country_code text COLLATE pg_catalog."default" DEFAULT '+1'::text,
    phone numeric(10,0),
    CONSTRAINT "Contact_pkey" PRIMARY KEY (id),
    CONSTRAINT contact_uniq_id UNIQUE (id)
        INCLUDE(id),
    CONSTRAINT email_chk CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$'::text)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS job_tracker.contact
    OWNER to postgres;

ALTER TABLE IF EXISTS job_tracker.contact
    ADD CONSTRAINT contact_name_unique UNIQUE (contact_name);

COMMENT ON TABLE job_tracker.contact
    IS 'Company contact information - may be an HR recruiter for the company or an independent recruiter';

COMMENT ON COLUMN job_tracker.contact.id
    IS 'Unique ID';

COMMENT ON COLUMN job_tracker.contact.contact_name
    IS 'Contact name';

COMMENT ON COLUMN job_tracker.contact.contact_email
    IS 'Contact''s email, if available';

COMMENT ON COLUMN job_tracker.contact.country_code
    IS 'In case of an international number';

COMMENT ON COLUMN job_tracker.contact.phone
    IS 'Contact phone number, if available';

COMMENT ON CONSTRAINT contact_uniq_id ON job_tracker.contact
    IS 'Unique contact';

COMMENT ON CONSTRAINT email_chk ON job_tracker.contact
    IS 'Simple email validation';
