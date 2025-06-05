const { Sequelize, DataTypes, Model } = require('sequelize');
const jobModel = require('../JobModel');

describe('Job Model', () => {
  let Company;
  let Job;
  let sequelize;

  beforeEach(() => {
    // Use in-memory SQLite for testing
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false
    });

    // Mock Company model
    Company = sequelize.define('Company', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.TEXT,
    });

    Job = jobModel(sequelize);

    // Define the association *after* both models are defined
    Job.associate = (models) => {
      Job.belongsTo(models.Company, { foreignKey: 'company_id' });
    };

    Job.associate({ Company }); // Call the associate function

    return sequelize.sync({ force: true }); // Sync the models to the database
  });

  afterEach(() => {
    return sequelize.close();
  });

  it('should define the Job model correctly', () => {
    expect(Job).toBeDefined();
    expect(Job.tableName).toBe('job');
  });

  it('should have the correct attributes', () => {
    expect(Job.rawAttributes).toHaveProperty('id');
    expect(Job.rawAttributes).toHaveProperty('title');
    expect(Job.rawAttributes).toHaveProperty('description');
    expect(Job.rawAttributes).toHaveProperty('remote');
    expect(Job.rawAttributes).toHaveProperty('salary_range');
    expect(Job.rawAttributes).toHaveProperty('comments');
    expect(Job.rawAttributes).toHaveProperty('company_id');

    expect(Job.rawAttributes.id.type).toBeInstanceOf(DataTypes.INTEGER);
    expect(Job.rawAttributes.title.type).toBeInstanceOf(DataTypes.TEXT);
    expect(Job.rawAttributes.description.type).toBeInstanceOf(DataTypes.TEXT);
    expect(Job.rawAttributes.remote.type).toBeInstanceOf(DataTypes.BOOLEAN);
    expect(Job.rawAttributes.salary_range.type).toBeInstanceOf(DataTypes.TEXT);
    expect(Job.rawAttributes.comments.type).toBeInstanceOf(DataTypes.TEXT);
    expect(Job.rawAttributes.company_id.type).toBeInstanceOf(DataTypes.INTEGER);

    expect(Job.rawAttributes.id.primaryKey).toBe(true);
    expect(Job.rawAttributes.id.allowNull).toBe(false);
    expect(Job.rawAttributes.id.autoIncrement).toBe(true);
    expect(Job.rawAttributes.title.allowNull).toBe(false);
    expect(Job.rawAttributes.description.allowNull).toBe(true);
    expect(Job.rawAttributes.remote.allowNull).toBe(false);
    expect(Job.rawAttributes.salary_range.allowNull).toBe(true);
    expect(Job.rawAttributes.comments.allowNull).toBe(true);
    expect(Job.rawAttributes.company_id.allowNull).toBe(true);

    expect(Job.rawAttributes.description.defaultValue).toBe('');
    expect(Job.rawAttributes.remote.defaultValue).toBe(true);
    expect(Job.rawAttributes.salary_range.defaultValue).toBe('???');
    expect(Job.rawAttributes.comments.defaultValue).toBe('');
  });

  it('should create a job instance', async () => {
    const job = await Job.create({
      title: 'Software Engineer',
      description: 'Develop software',
      remote: true,
      salary_range: '$100k-$150k',
      comments: 'Good opportunity',
    });

    expect(job.id).toBeDefined();
    expect(job.title).toBe('Software Engineer');
    expect(job.description).toBe('Develop software');
    expect(job.remote).toBe(true);
    expect(job.salary_range).toBe('$100k-$150k');
    expect(job.comments).toBe('Good opportunity');
  });

  it('should associate with Company', async () => {
    const company = await Company.create({ name: 'Acme Inc.' });
    const job = await Job.create({
      title: 'Software Engineer',
      description: 'Develop software',
      remote: true,
      salary_range: '$100k-$150k',
      comments: 'Good opportunity',
      company_id: company.id,
    });

    const associatedCompany = await job.getCompany();
    expect(associatedCompany.id).toBe(company.id);
    expect(associatedCompany.name).toBe('Acme Inc.');
  });

  it('should handle default values correctly', async () => {
    const job = await Job.create({
      title: 'Test Job'
    });

    expect(job.description).toBe('');
    expect(job.remote).toBe(true);
    expect(job.salary_range).toBe('???');
    expect(job.comments).toBe('');
  });
});
