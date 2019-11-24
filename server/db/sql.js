const userObj = 'insert into users (firstname, lastname, email, phone, password) values ($1, $2, $3, $4, $5) returning *';
const queryUsersByEmail = 'select * from users where email = $1';
const bucketObj = 'insert into buckets (name, created_by) values ($1, $2) returning *';
const itemObj = 'update buckets set items = $1, date_modified = $2 where id = $3 returning *';



export {
    userObj, queryUsersByEmail, bucketObj, itemObj
};