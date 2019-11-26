"use strict";
module.exports = (sequelize, DataTypes) => {
  const items = sequelize.define(
    "items",
    {
      name: {
        type: DataTypes.STRING(225),
        allowNull: false
      },
      done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'compositeIndex'
      }
    },
    {
      timestamps: true
    }
  );
  items.associate = function(models) {
    items.belongsTo(models.bucket, {
      foreignKey: "parent_id",
      as: "bucketItems"
    });
  };
  return items;
};
