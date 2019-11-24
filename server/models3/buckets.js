// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const bucket = sequelize.define('bucket', {
//     name: DataTypes.STRING,
//     items: DataTypes.JSONB,
//     created_by: DataTypes.INTEGER
//   }, {});
//   bucket.associate = function(models) {
//     // associations can be defined here
//     bucket.belongsTo(models.user, { foreignKey: 'created_by', onDelete: 'CASCADE', });
//   };
//   return bucket;
// };

module.exports = (sequelize, DataTypes) => {
  const bucket = sequelize.define('bucket', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    items: {
      type: DataTypes.JSONB,
      allowNull: false,
      // autoIncrement: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    created_by: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'user',
        key: 'id',
      },
    },
  }, {});
  bucket.associate = function(models) {
    bucket.belongsTo(models.user, { foreignKey: 'created_by', onDelete: 'CASCADE', });
    // associations can be defined here
  };
  return buckets;
};