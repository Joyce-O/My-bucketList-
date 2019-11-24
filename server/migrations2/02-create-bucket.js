import db from '../models2';

module.exports = {
  up: queryInterface => queryInterface.createTable(db.bucket.tableName,
    db.bucket.rawAttributes),
  down: queryInterface => queryInterface.dropTable('bucket')
};