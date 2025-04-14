-- Table: job_tracker.company

-- DROP TABLE IF EXISTS job_tracker.company;

CREATE TABLE IF NOT EXISTS job_tracker.company
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    website text COLLATE pg_catalog."default" DEFAULT ''::text,
    CONSTRAINT "Company_pkey" PRIMARY KEY (id),
    CONSTRAINT company_uniq_id UNIQUE (id),
    CONSTRAINT website_chk CHECK (website ~* '^(http|https)://[a-zA-Z0-9. -]+\.[a-zA-Z]{2,}$'::text)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS job_tracker.company
    OWNER to postgres;

COMMENT ON TABLE job_tracker.company
    IS 'Information about the company with the job opening';

COMMENT ON COLUMN job_tracker.company.id
    IS 'Unique ID of the company';

COMMENT ON COLUMN job_tracker.company.name
    IS 'Company name';

COMMENT ON COLUMN job_tracker.company.website
    IS 'Website url if available';

COMMENT ON CONSTRAINT company_uniq_id ON job_tracker.company
    IS 'Company id is unique';

COMMENT ON CONSTRAINT website_chk ON job_tracker.company
    IS 'Validate url';