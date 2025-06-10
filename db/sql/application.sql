-- job_tracker.application definition

-- Drop table

-- DROP TABLE job_tracker.application;

CREATE TABLE job_tracker.application (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	application_date date NOT NULL,
	referral bool DEFAULT false NOT NULL,
	referred_by text NULL,
	contacted bool DEFAULT false NOT NULL,
	status text NOT NULL,
	rejection_date date NULL,
	"comments" text NULL,
	cover_letter text NULL,
	company_id int4 NOT NULL,
	job_id int4 NOT NULL,
	contact_id int4 NULL,
	CONSTRAINT "Application_pkey" PRIMARY KEY (id),
	CONSTRAINT application_uniq_id UNIQUE (id),
	CONSTRAINT status_chk CHECK ((status = ANY (ARRAY['Applied'::text, 'Callback'::text, 'CodingAssignment'::text, 'Declined'::text, 'Ghosted'::text, 'Interview 1'::text, 'Interview 2'::text, 'Interview 3'::text, 'Rejected'::text, 'Withdrawn'::text]))),
	CONSTRAINT company_id FOREIGN KEY (company_id) REFERENCES job_tracker.company(id),
	CONSTRAINT contact_id FOREIGN KEY (contact_id) REFERENCES job_tracker.contact(id),
	CONSTRAINT job_id FOREIGN KEY (job_id) REFERENCES job_tracker.job(id)
);
CREATE INDEX "fki_company-id" ON job_tracker.application USING btree (company_id);
CREATE INDEX "fki_contact-id" ON job_tracker.application USING btree (contact_id);
CREATE INDEX fki_contact_id ON job_tracker.application USING btree (id);
CREATE INDEX "fki_job-id" ON job_tracker.application USING btree (job_id);
CREATE INDEX fki_job_id ON job_tracker.application USING btree (id);

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
