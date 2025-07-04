const { Model, DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  class Job extends Model {
    static associate(models) {
      // Define associations here
      Job.belongsTo(models.Company, { foreignKey: 'company_id' });
    }
  }

  Job.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, // Add autoIncrement if it's an auto-incrementing PK
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '',
      },
      remote: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      salary_range: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '???',
      },
      comments: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '',
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Job',
      tableName: 'job',
      timestamps: true,
    }
  );

  return Job;
};
