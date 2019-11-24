import { Pool } from 'pg';
import 'dotenv/config';

let connect;
console.log(process.env.NODE_ENV === 'development');

if (process.env.NODE_ENV === 'test:dev') {
  connect = {
    connectionString: process.env.TESTDB_URL
  };
} else {
  connect = {
    connectionString: process.env.DATABASE_URL
  };
}

const pool = new Pool(connect);

export default pool;