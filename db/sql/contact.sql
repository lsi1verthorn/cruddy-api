-- job_tracker.contact definition

-- Drop table

-- DROP TABLE job_tracker.contact;

CREATE TABLE job_tracker.contact (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	contact_name text NOT NULL,
	contact_email text NULL,
	country_code text DEFAULT '+1'::text NULL,
	phone numeric(10) NULL,
	CONSTRAINT "Contact_pkey" PRIMARY KEY (id),
	CONSTRAINT "Unique contact name" UNIQUE NULLS NOT DISTINCT (contact_name),
	CONSTRAINT contact_uniq_id UNIQUE (id) INCLUDE (id),
	CONSTRAINT email_chk CHECK ((contact_email ~* '^[^@]+@[^@]+\.[^@]+$'::text))
);

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
