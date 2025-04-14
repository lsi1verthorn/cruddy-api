const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Application extends Model {
    static associate(models) {
      // Define associations here
      Application.belongsTo(models.Company, { foreignKey: 'company_id' });
      Application.belongsTo(models.Job, { foreignKey: 'job_id' });
      Application.belongsTo(models.Contact, { foreignKey: 'contact_id' });
    }

    getCompanyId() {
      return this.company_id;
    }

    getContactId() {
      return this.contact_id;
    }

    getJobId() {
      return this.job_id;
    }
  }

  Application.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, // Add autoIncrement if it's an auto-incrementing PK
      },
      application_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      referral: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      referred_by: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      contacted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isIn: [['Applied', 'Callback', 'CodingAssignment', 'Ghosted', 'Interview 1', 'Interview 2', 'Interview 3', 'Rejected']],
        },
      },
      rejection_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      comments: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      cover_letter: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      job_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      contact_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Application',
      tableName: 'application',
      timestamps: true,
    }
  );

  return Application;
};
