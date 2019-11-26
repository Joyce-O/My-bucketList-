'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      done: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'compositeIndex'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('items');
  }
};