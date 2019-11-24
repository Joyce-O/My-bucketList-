// 'use strict';
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.createTable('buckets', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       name: {
//         type: Sequelize.STRING
//       },
//       items: {
//         type: Sequelize.JSONB
//       },
//       created_by: {
//         type: Sequelize.INTEGER
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
//     return queryInterface.dropTable('buckets');
//   }
// };
module.exports = {
  up: queryInterface => queryInterface.createTable(db.bucket.tableName,
    db.bucket.rawAttributes),
  down: queryInterface => queryInterface.dropTable('bucket')
};