-- job_tracker.job definition

-- Drop table

-- DROP TABLE job_tracker.job;

CREATE TABLE job_tracker.job (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	title text NOT NULL,
	description text DEFAULT ''::text NULL,
	remote bool DEFAULT true NOT NULL,
	salary_range text DEFAULT '???'::text NULL,
	"comments" text DEFAULT ''::text NULL,
	company_id int4 NULL,
	CONSTRAINT "Job_pkey" PRIMARY KEY (id),
	CONSTRAINT job_uniq_id UNIQUE (id) INCLUDE (id),
	CONSTRAINT company_id FOREIGN KEY (company_id) REFERENCES job_tracker.company(id)
);
CREATE INDEX fki_company_id ON job_tracker.job USING btree (company_id);

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
