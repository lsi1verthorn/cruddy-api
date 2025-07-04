const { Sequelize, DataTypes } = require('sequelize');
const companyModel = require('../CompanyModel');

describe('Company Model', () => {
  let sequelize;
  let Company;

  beforeEach(() => {
    // Use in-memory SQLite for testing
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false
    });
    Company = companyModel(sequelize);

    return sequelize.sync({ force: true });
  });

  afterEach(() => {
    return sequelize.close();
  });

  it('should define the Company model correctly', () => {
    expect(Company).toBeDefined();
    expect(Company.tableName).toBe('company');
  });

  it('should have the correct attributes', () => {
    expect(Company.rawAttributes).toHaveProperty('id');
    expect(Company.rawAttributes).toHaveProperty('company_name');
    expect(Company.rawAttributes).toHaveProperty('company_website');

    expect(Company.rawAttributes.id.type).toBeInstanceOf(DataTypes.INTEGER);
    expect(Company.rawAttributes.company_name.type).toBeInstanceOf(DataTypes.TEXT);
    expect(Company.rawAttributes.company_website.type).toBeInstanceOf(DataTypes.TEXT);

    expect(Company.rawAttributes.id.primaryKey).toBe(true);
    expect(Company.rawAttributes.id.allowNull).toBe(false);
    expect(Company.rawAttributes.id.autoIncrement).toBe(true);
    expect(Company.rawAttributes.company_name.allowNull).toBe(false);
    expect(Company.rawAttributes.company_website.allowNull).toBe(true);

    expect(Company.rawAttributes.company_name.defaultValue).toBe('');
  });

  it('should create a company instance', async () => {
    const company = await Company.create({
      company_name: 'Test Company',
      company_website: 'https://www.test.com',
    });

    expect(company.id).toBeDefined();
    expect(company.company_name).toBe('Test Company');
    expect(company.company_website).toBe('https://www.test.com');
  });

  it('should handle default name correctly', async () => {
    const company = await Company.create({});
    expect(company.company_name).toBe('');
  });

  it('should validate website URL', async () => {
    await expect(Company.create({
      company_name: 'Invalid Website',
      company_website: 'invalid-url',
    })).rejects.toThrow();

    await expect(Company.create({
      company_name: 'valid Website',
      company_website: 'https://www.valid.com',
    })).resolves.toBeDefined();
  });
});
