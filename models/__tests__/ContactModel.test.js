const { Sequelize, DataTypes } = require('sequelize');
const contactModel = require('../ContactModel');

describe('Contact Model', () => {
  let Contact;
  let sequelize;

  beforeEach(() => {
    sequelize = new Sequelize('sqlite::memory:', { logging: false });
    Contact = contactModel(sequelize);

    return sequelize.sync({ force: true });
  });

  afterEach(() => {
    return sequelize.close();
  });

  it('should define the Contact model correctly', () => {
    expect(Contact).toBeDefined();
    expect(Contact.tableName).toBe('contact');
  });

  it('should have the correct attributes', () => {
    expect(Contact.rawAttributes).toHaveProperty('id');
    expect(Contact.rawAttributes).toHaveProperty('contact_name');
    expect(Contact.rawAttributes).toHaveProperty('contact_email');
    expect(Contact.rawAttributes).toHaveProperty('country_code');
    expect(Contact.rawAttributes).toHaveProperty('phone');

    expect(Contact.rawAttributes.id.type).toBeInstanceOf(DataTypes.INTEGER);
    expect(Contact.rawAttributes.contact_name.type).toBeInstanceOf(DataTypes.TEXT);
    expect(Contact.rawAttributes.contact_email.type).toBeInstanceOf(DataTypes.TEXT);
    expect(Contact.rawAttributes.country_code.type).toBeInstanceOf(DataTypes.TEXT);
    expect(Contact.rawAttributes.phone.type).toBeInstanceOf(DataTypes.DECIMAL);

    expect(Contact.rawAttributes.id.primaryKey).toBe(true);
    expect(Contact.rawAttributes.id.allowNull).toBe(false);
    expect(Contact.rawAttributes.id.autoIncrement).toBe(true);
    expect(Contact.rawAttributes.contact_name.allowNull).toBe(false);
    expect(Contact.rawAttributes.contact_email.allowNull).toBe(true);
    expect(Contact.rawAttributes.country_code.allowNull).toBe(true);
    expect(Contact.rawAttributes.phone.allowNull).toBe(true);

    expect(Contact.rawAttributes.country_code.defaultValue).toBe('+1');
    expect(Contact.rawAttributes.phone.type.options.precision).toBe(10);
    expect(Contact.rawAttributes.phone.type.options.scale).toBe(0);
  });

  it('should create a contact instance', async () => {
    const contact = await Contact.create({
      contact_name: 'John Doe',
      contact_email: 'john.doe@example.com',
      country_code: '+44',
      phone: 1234567890,
    });

    expect(contact.id).toBeDefined();
    expect(contact.contact_name).toBe('John Doe');
    expect(contact.contact_email).toBe('john.doe@example.com');
    expect(contact.country_code).toBe('+44');
    expect(contact.phone).toBe(1234567890);
  });

  it('should handle default country_code', async () => {
    const contact = await Contact.create({
      contact_name: 'Jane Smith',
      contact_email: 'jane.smith@example.com',
      phone: 9876543210,
    });

    expect(contact.country_code).toBe('+1');
  });

  it('should validate email format', async () => {
    await expect(Contact.create({
      contact_name: 'Invalid Email',
      contact_email: 'invalid-email',
      phone: 1234123412,
    })).rejects.toThrow();

    await expect(Contact.create({
      contact_name: 'valid Email',
      contact_email: 'valid@email.com',
      phone: 1234123412,
    })).resolves.toBeDefined();
  });

  it('should handle decimal precision and scale for phone', async () => {
    const contact = await Contact.create({
      contact_name: 'Phone Precision Test',
      contact_email: 'phone@test.com',
      phone: 1234567890,
    });
    expect(contact.phone).toBe(1234567890);
  });
});
