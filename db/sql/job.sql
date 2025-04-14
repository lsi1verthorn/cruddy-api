-- Table: job_tracker.job

-- DROP TABLE IF EXISTS job_tracker.job;

CREATE TABLE IF NOT EXISTS job_tracker.job
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    title text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" DEFAULT ''::text,
    remote boolean NOT NULL DEFAULT true,
    salary_range text COLLATE pg_catalog."default" DEFAULT '???'::text,
    comments text COLLATE pg_catalog."default" DEFAULT ''::text,
    company_id integer,
    CONSTRAINT "Job_pkey" PRIMARY KEY (id),
    CONSTRAINT job_uniq_id UNIQUE (id)
        INCLUDE(id),
    CONSTRAINT company_id FOREIGN KEY (company_id)
        REFERENCES job_tracker.company (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS job_tracker.job
    OWNER to postgres;

COMMENT ON TABLE job_tracker.job
    IS 'Advertised job';

COMMENT ON COLUMN job_tracker.job.id
    IS 'Unique ID';

COMMENT ON COLUMN job_tracker.job.title
    IS 'Position title';

COMMENT ON COLUMN job_tracker.job.description
    IS 'A more complete description of the job and its requirements';

COMMENT ON COLUMN job_tracker.job.remote
    IS 'Location requirement';

COMMENT ON COLUMN job_tracker.job.salary_range
    IS 'Salary range if provided in posting';

COMMENT ON COLUMN job_tracker.job.comments
    IS 'Anything additional that might be relevant';

COMMENT ON COLUMN job_tracker.job.company_id
    IS 'Company that is offering the job';

COMMENT ON CONSTRAINT job_uniq_id ON job_tracker.job
    IS 'Unique job id';

COMMENT ON CONSTRAINT company_id ON job_tracker.job
    IS 'Company id key';
-- Index: fki_company_id

-- DROP INDEX IF EXISTS job_tracker.fki_company_id;

CREATE INDEX IF NOT EXISTS fki_company_id
    ON job_tracker.job USING btree
    (company_id ASC NULLS LAST)
    TABLESPACE pg_default;