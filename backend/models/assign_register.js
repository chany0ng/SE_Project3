'use strict';
module.exports = (sequelize, DataTypes) => {
  const assign_register = sequelize.define('assign_register', {
    register_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    professor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'professors',
        key: 'professor_id'
      }
    },
    subject_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'subjects',
        key: 'subject_id'
      }
    },
    assign_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    assign_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    assign_due_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    isDeleted: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
    },  
  }, {
    tableName: 'assign_register'
  });
  assign_register.associate = function(models) {
    assign_register.belongsTo(models.professors, {
      foreignKey: 'professor_id',
      targetKey: 'professor_id'
    });

    assign_register.belongsTo(models.subjects, {
      foreignKey: 'subject_id',
      targetKey: 'subject_id'
    });
    // associations can be defined here
  };
  return assign_register;
};