"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      firstname: {
        type: DataTypes.STRING(225),
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING(225),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        },
        unique: {
          args: true,
          msg: "Email address already in use!"
        }
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: true, 
      // disable the modification of table names; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      freezeTableName: true
    }
  );
  user.associate = function(models) {
    user.hasMany(models.bucket, { foreignKey: "created_by" });
  };
  return user;
};
