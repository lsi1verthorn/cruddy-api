const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Company extends Model {
    static associate(models) {
    }
  }

  Company.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, // Add autoIncrement if it's an auto-incrementing PK
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      website: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Company',
      tableName: 'company',
      timestamps: true,
    }
  );

  return Company;
};
