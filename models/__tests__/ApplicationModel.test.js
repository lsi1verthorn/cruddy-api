const { Sequelize, DataTypes } = require('sequelize');
const applicationModel = require('../ApplicationModel');

describe('Application Model', () => {
  let Application;
  let Company;
  let Contact;
  let Job;

  let sequelize;

  beforeEach(() => {
    sequelize = new Sequelize('sqlite::memory:', { logging: false });

    // Mock models for associations
    Company = sequelize.define('Company', { id: { type: DataTypes.INTEGER, primaryKey: true }, name: DataTypes.TEXT });
    Job = sequelize.define('Job', { id: { type: DataTypes.INTEGER, primaryKey: true }, title: DataTypes.TEXT });
    Contact = sequelize.define('Contact', { id: { type: DataTypes.INTEGER, primaryKey: true }, name: DataTypes.TEXT });

    Application = applicationModel(sequelize);

    Application.associate = (models) => {
      Application.belongsTo(models.Company, { foreignKey: 'company_id' });
      Application.belongsTo(models.Job, { foreignKey: 'job_id' });
      Application.belongsTo(models.Contact, { foreignKey: 'contact_id' });
    };

    Application.associate({ Company, Job, Contact });

    return sequelize.sync({ force: true });
  });

  afterEach(() => {
    return sequelize.close();
  });

  it('should define the Application model correctly', () => {
    expect(Application).toBeDefined();
    expect(Application.tableName).toBe('application');
  });

  it('should have the correct attributes', () => {
    expect(Application.rawAttributes).toHaveProperty('id');
    expect(Application.rawAttributes).toHaveProperty('application_date');
    expect(Application.rawAttributes).toHaveProperty('referral');
    expect(Application.rawAttributes).toHaveProperty('referred_by');
    expect(Application.rawAttributes).toHaveProperty('contacted');
    expect(Application.rawAttributes).toHaveProperty('status');
    expect(Application.rawAttributes).toHaveProperty('rejection_date');
    expect(Application.rawAttributes).toHaveProperty('comments');
    expect(Application.rawAttributes).toHaveProperty('cover_letter');
    expect(Application.rawAttributes).toHaveProperty('company_id');
    expect(Application.rawAttributes).toHaveProperty('job_id');
    expect(Application.rawAttributes).toHaveProperty('contact_id');

    expect(Application.rawAttributes.id.type).toBeInstanceOf(DataTypes.INTEGER);
    expect(Application.rawAttributes.application_date.type).toBeInstanceOf(DataTypes.DATE);
    expect(Application.rawAttributes.referral.type).toBeInstanceOf(DataTypes.BOOLEAN);
    expect(Application.rawAttributes.referred_by.type).toBeInstanceOf(DataTypes.TEXT);
    expect(Application.rawAttributes.contacted.type).toBeInstanceOf(DataTypes.BOOLEAN);
    expect(Application.rawAttributes.status.type).toBeInstanceOf(DataTypes.TEXT);
    expect(Application.rawAttributes.rejection_date.type).toBeInstanceOf(DataTypes.DATE);
    expect(Application.rawAttributes.comments.type).toBeInstanceOf(DataTypes.TEXT);
    expect(Application.rawAttributes.cover_letter.type).toBeInstanceOf(DataTypes.TEXT);
    expect(Application.rawAttributes.company_id.type).toBeInstanceOf(DataTypes.INTEGER);
    expect(Application.rawAttributes.job_id.type).toBeInstanceOf(DataTypes.INTEGER);
    expect(Application.rawAttributes.contact_id.type).toBeInstanceOf(DataTypes.INTEGER);

    expect(Application.rawAttributes.id.primaryKey).toBe(true);
    expect(Application.rawAttributes.id.allowNull).toBe(false);
    expect(Application.rawAttributes.id.autoIncrement).toBe(true);
    expect(Application.rawAttributes.application_date.allowNull).toBe(false);
    expect(Application.rawAttributes.referral.allowNull).toBe(false);
    expect(Application.rawAttributes.contacted.allowNull).toBe(false);
    expect(Application.rawAttributes.status.allowNull).toBe(false);

    expect(Application.rawAttributes.referral.defaultValue).toBe(false);
    expect(Application.rawAttributes.contacted.defaultValue).toBe(false);
  });

  it('should create an application instance', async () => {
    const company = await Company.create({ name: 'Test Company' });
    const job = await Job.create({ title: 'Test Job' });
    const contact = await Contact.create({ name: 'Test Contact' });

    const application = await Application.create({
      application_date: new Date(),
      referral: true,
      referred_by: 'John Doe',
      contacted: true,
      status: 'Interview 1',
      rejection_date: null,
      comments: 'Test comments',
      cover_letter: 'Test cover letter',
      company_id: company.id,
      job_id: job.id,
      contact_id: contact.id,
    });

    expect(application.id).toBeDefined();
    expect(application.application_date).toBeDefined();
    expect(application.referral).toBe(true);
    expect(application.referred_by).toBe('John Doe');
    expect(application.contacted).toBe(true);
    expect(application.status).toBe('Interview 1');
    expect(application.comments).toBe('Test comments');
    expect(application.cover_letter).toBe('Test cover letter');
    expect(application.company_id).toBe(company.id);
    expect(application.job_id).toBe(job.id);
    expect(application.contact_id).toBe(contact.id);
  });

  it('should handle default values', async () => {
    const application = await Application.create({
      application_date: new Date(),
      status: 'Applied',
    });

    expect(application.referral).toBe(false);
    expect(application.contacted).toBe(false);
  });

  it('should validate status value', async () => {
    await expect(Application.create({
      application_date: new Date(),
      status: 'InvalidStatus',
    })).rejects.toThrow();

    await expect(Application.create({
      application_date: new Date(),
      status: 'Callback',
    })).resolves.toBeDefined();
  });

  it('should associate with Company, Job, and Contact', async () => {
    const company = await Company.create({ name: 'Test Company' });
    const job = await Job.create({ title: 'Test Job' });
    const contact = await Contact.create({ name: 'Test Contact' });

    const application = await Application.create({
      application_date: new Date(),
      status: 'Applied',
      company_id: company.id,
      job_id: job.id,
      contact_id: contact.id,
    });

    const associatedCompany = await application.getCompanyId();
    const associatedJob = await application.getJobId();
    const associatedContact = await application.getContactId();

    expect(associatedCompany).toBe(company.id);
    expect(associatedJob).toBe(job.id);
    expect(associatedContact).toBe(contact.id);
  });
});
