// 'use strict';
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.createTable('users', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       id: {
//         type: Sequelize.STRING
//       },
//       firstname: {
//         type: Sequelize.STRING
//       },
//       lastname: {
//         type: Sequelize.STRING
//       },
//       email: {
//         type: Sequelize.STRING
//       },
//       isAdmin: {
//         type: Sequelize.BOOLEAN
//       },
//       password: {
//         type: Sequelize.STRING
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.dropTable('users');
//   }
// };
import db from '../models';

module.exports = {
  up: queryInterface => queryInterface.createTable(db.user.tableName,
    db.user.rawAttributes).then(() => {
    queryInterface.addConstraint('user', ['email'], {
      type: 'unique'
    });
  }),
  down: queryInterface => queryInterface.dropTable('user')
};