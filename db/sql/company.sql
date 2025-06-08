-- job_tracker.company definition

-- Drop table

-- DROP TABLE job_tracker.company;

CREATE TABLE job_tracker.company (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	company_name text DEFAULT ''::text NOT NULL,
	company_website text NULL,
	CONSTRAINT "Company_pkey" PRIMARY KEY (id),
	CONSTRAINT "Unique company name" UNIQUE NULLS NOT DISTINCT (company_name),
	CONSTRAINT company_uniq_id UNIQUE (id),
	CONSTRAINT website_chk CHECK ((company_website ~* '^(http|https)://[a-zA-Z0-9. -]+\.[a-zA-Z]{2,}$'::text))
);

TABLESPACE pg_default;

ALTER TABLE IF EXISTS job_tracker.company
    OWNER to postgres;

ALTER TABLE IF EXISTS job_tracker.company
    ADD CONSTRAINT company_name_unique UNIQUE (company_name);

COMMENT ON TABLE job_tracker.company
    IS 'Information about the company with the job opening';

COMMENT ON COLUMN job_tracker.company.id
    IS 'Unique ID of the company';

COMMENT ON COLUMN job_tracker.company.company_name
    IS 'Company name';

COMMENT ON COLUMN job_tracker.company.company_website
    IS 'Website url if available';

COMMENT ON CONSTRAINT company_uniq_id ON job_tracker.company
    IS 'Company id is unique';

COMMENT ON CONSTRAINT website_chk ON job_tracker.company
    IS 'Validate url';
