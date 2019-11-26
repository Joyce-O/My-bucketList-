"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable("user", {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          firstname: {
            type: Sequelize.STRING
          },
          lastname: {
            type: Sequelize.STRING
          },
          email: {
            type: Sequelize.STRING
          },
          isAdmin: {
            type: Sequelize.BOOLEAN
          },
          password: {
            type: Sequelize.STRING
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
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("user");
  }
};
