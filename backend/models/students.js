'use strict';
module.exports = (sequelize, DataTypes) => {
  const students = sequelize.define('students', {
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    pw: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    major: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pw_question: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pw_answer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
  }, {
    timestamps: false
  });
  students.associate = function(models) {
    // associations can be defined here
  };
  return students;
};