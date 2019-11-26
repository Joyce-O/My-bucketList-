import bcrypt from 'bcrypt';


const hashPassword = (password, saltRounds) =>  Promise.resolve(bcrypt.hash(password, saltRounds))
.then(function(value) {
  return value;
});

const verifyPassword = (prev, current) => bcrypt.compare(prev, current);

export { hashPassword, verifyPassword };