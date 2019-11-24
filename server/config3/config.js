// require('@babel/register');
require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL'
  },
  test: {
    use_env_variable: 'TESTDB_URL'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};