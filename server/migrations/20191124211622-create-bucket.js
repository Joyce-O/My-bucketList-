"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("buckets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      items: {
        type: Sequelize.JSONB,
        allowNull: false
        // autoIncrement: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("buckets");
  }
};

// import db from "../models";

// module.exports = {
//   up: queryInterface =>
//     queryInterface.createTable(db.bucket.tableName, db.bucket.rawAttributes),
//   down: queryInterface => queryInterface.dropTable("bucket")
// };
