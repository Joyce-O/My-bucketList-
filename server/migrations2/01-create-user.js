import db from '../models2';

module.exports = {
  up: queryInterface => queryInterface.createTable(db.user.tableName,
    db.user.rawAttributes).then(() => {
    queryInterface.addConstraint('user', ['email'], {
      type: 'unique'
    });
  }),
  down: queryInterface => queryInterface.dropTable('user')
};
