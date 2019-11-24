import pool from "./connection";

const createUser = `DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    firstname CHARACTER VARYING(50) NOT NULL,
    lastname CHARACTER VARYING(50) NOT NULL,
    email CHARACTER VARYING(50) UNIQUE NOT NULL,
    phone CHARACTER VARYING(13),
    password CHARACTER VARYING(255) NOT NULL,
    is_admin BOOL NOT NULL DEFAULT (false)
   
)`;

const createBucket = `DROP TABLE IF EXISTS buckets CASCADE;
CREATE TABLE buckets (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT UNIQUE NOT NULL,
  items JSONB, 
  date_created TIMESTAMP NOT NULL DEFAULT (NOW()),
  date_modified TIMESTAMP NOT NULL DEFAULT (NOW()),
  created_by INTEGER NOT NULL,
  FOREIGN KEY (created_by) references users(id) on delete cascade
)`;

async function tables() {
  try {
    console.log("success");
    await pool.query(createUser);
  } catch (error) {
    throw new Error("user table creation failed");
  }

  try {
    await pool.query(createBucket);
  } catch (error) {
    throw new Error("bucket table creation failed");
  }
}

tables();

export default tables;
