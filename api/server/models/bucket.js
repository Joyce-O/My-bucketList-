"use strict";
module.exports = (sequelize, DataTypes) => {
  const buckets = sequelize.define(
    "bucket",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      timestamps: true, 
      // disable the modification of table names; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      freezeTableName: true
    }
  );
  buckets.associate = function(models) {
    buckets.belongsTo(models.user, {
      foreignKey: "created_by"
    });
    buckets.hasMany(models.items, { foreignKey: "parent_id", as: "bucketItems" });
  };
  return buckets;
};
