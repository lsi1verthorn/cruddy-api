-- Table: job_tracker.application

-- DROP TABLE IF EXISTS job_tracker.application;

CREATE TABLE IF NOT EXISTS job_tracker.application
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    application_date date NOT NULL,
    referral boolean NOT NULL DEFAULT false,
    referred_by text COLLATE pg_catalog."default" DEFAULT ''::text,
    contacted boolean NOT NULL DEFAULT false,
    status text COLLATE pg_catalog."default" NOT NULL,
    rejection_date date,
    comments text COLLATE pg_catalog."default",
    cover_letter text COLLATE pg_catalog."default",
    company_id integer NOT NULL,
    job_id integer NOT NULL,
    contact_id integer,
    CONSTRAINT "Application_pkey" PRIMARY KEY (id),
    CONSTRAINT application_uniq_id UNIQUE (id),
    CONSTRAINT company_id FOREIGN KEY (company_id)
        REFERENCES job_tracker.company (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT contact_id FOREIGN KEY (contact_id)
        REFERENCES job_tracker.contact (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT job_id FOREIGN KEY (job_id)
        REFERENCES job_tracker.job (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT status_chk CHECK (status = ANY (ARRAY['Applied'::text, 'Callback'::text, 'CodingAssignment'::text, 'Declined'::text, 'Ghosted'::text, 'Interview 1'::text, 'Interview 2'::text, 'Interview 3'::text, 'Rejected'::text, 'Withdrawn'::text]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS job_tracker.application
    OWNER to postgres;

COMMENT ON TABLE job_tracker.application
    IS 'Information pertaining to the application';

COMMENT ON COLUMN job_tracker.application.id
    IS 'Unique ID';

COMMENT ON COLUMN job_tracker.application.application_date
    IS 'Date application submitted';

COMMENT ON COLUMN job_tracker.application.referral
    IS 'Did someone refer me?';

COMMENT ON COLUMN job_tracker.application.referred_by
    IS 'Name of contact';

COMMENT ON COLUMN job_tracker.application.contacted
    IS 'Did i receive a call back?';

COMMENT ON COLUMN job_tracker.application.status
    IS 'Status of the application';

COMMENT ON COLUMN job_tracker.application.rejection_date
    IS 'Date if the application is rejected or if the interview process did not progress';

COMMENT ON COLUMN job_tracker.application.comments
    IS 'Any additional comments that apply';

COMMENT ON COLUMN job_tracker.application.cover_letter
    IS 'Text of the cover letter or maybe an upload link';

COMMENT ON COLUMN job_tracker.application.company_id
    IS 'ID of the company that has the job listing';

COMMENT ON COLUMN job_tracker.application.job_id
    IS 'ID of the job being applied for';

COMMENT ON COLUMN job_tracker.application.contact_id
    IS 'ID of the contact person, if available';

COMMENT ON CONSTRAINT application_uniq_id ON job_tracker.application
    IS 'Unique application id';

COMMENT ON CONSTRAINT company_id ON job_tracker.application
    IS 'Unique ID of the company';
COMMENT ON CONSTRAINT contact_id ON job_tracker.application
    IS 'ID for a contact person, if available';
COMMENT ON CONSTRAINT job_id ON job_tracker.application
    IS 'ID of the job being offered';

COMMENT ON CONSTRAINT status_chk ON job_tracker.application
    IS 'Make sure that the status field can only be of certain types';
-- Index: fki_company-id

-- DROP INDEX IF EXISTS job_tracker."fki_company-id";

CREATE INDEX IF NOT EXISTS "fki_company-id"
    ON job_tracker.application USING btree
    (company_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_contact-id

-- DROP INDEX IF EXISTS job_tracker."fki_contact-id";

CREATE INDEX IF NOT EXISTS "fki_contact-id"
    ON job_tracker.application USING btree
    (contact_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_contact_id

-- DROP INDEX IF EXISTS job_tracker.fki_contact_id;

CREATE INDEX IF NOT EXISTS fki_contact_id
    ON job_tracker.application USING btree
    (id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_job-id

-- DROP INDEX IF EXISTS job_tracker."fki_job-id";

CREATE INDEX IF NOT EXISTS "fki_job-id"
    ON job_tracker.application USING btree
    (job_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_job_id

-- DROP INDEX IF EXISTS job_tracker.fki_job_id;

CREATE INDEX IF NOT EXISTS fki_job_id
    ON job_tracker.application USING btree
    (id ASC NULLS LAST)
    TABLESPACE pg_default;
