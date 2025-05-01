const { Model, DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  class Contact extends Model {
    static associate(models) {
      // Define associations here (if any)
    }
  }

  Contact.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, // Add autoIncrement if it's an auto-incrementing PK
      },
      contact_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      contact_email: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      country_code: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '+1',
      },
      phone: {
        type: DataTypes.DECIMAL(10,0),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Contact',
      tableName: 'contact',
      timestamps: true,
    }
  );

  return Contact;
};
