const { Sequelize, DataTypes } = require('sequelize');
const companyModel = require('../CompanyModel');

describe('Company Model', () => {
  let sequelize;
  let Company;

  beforeEach(() => {
    sequelize = new Sequelize('sqlite::memory:', { logging: false });
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
    expect(Company.rawAttributes).toHaveProperty('name');
    expect(Company.rawAttributes).toHaveProperty('website');

    expect(Company.rawAttributes.id.type).toBeInstanceOf(DataTypes.INTEGER);
    expect(Company.rawAttributes.name.type).toBeInstanceOf(DataTypes.TEXT);
    expect(Company.rawAttributes.website.type).toBeInstanceOf(DataTypes.TEXT);

    expect(Company.rawAttributes.id.primaryKey).toBe(true);
    expect(Company.rawAttributes.id.allowNull).toBe(false);
    expect(Company.rawAttributes.id.autoIncrement).toBe(true);
    expect(Company.rawAttributes.name.allowNull).toBe(false);
    expect(Company.rawAttributes.website.allowNull).toBe(true);

    expect(Company.rawAttributes.name.defaultValue).toBe('');
  });

  it('should create a company instance', async () => {
    const company = await Company.create({
      name: 'Test Company',
      website: 'https://www.test.com',
    });

    expect(company.id).toBeDefined();
    expect(company.name).toBe('Test Company');
    expect(company.website).toBe('https://www.test.com');
  });

  it('should handle default name correctly', async () => {
    const company = await Company.create({});
    expect(company.name).toBe('');
  });

  it('should validate website URL', async () => {
    await expect(Company.create({
      name: 'Invalid Website',
      website: 'invalid-url',
    })).rejects.toThrow();

    await expect(Company.create({
      name: 'valid Website',
      website: 'https://www.valid.com',
    })).resolves.toBeDefined();
  });
});
