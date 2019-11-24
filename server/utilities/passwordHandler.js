import bcrypt from 'bcrypt';


const hashPassword = (password, saltRounds) => {
  return bcrypt.hashSync(password, saltRounds);
};

const verifyPassword = (prev, current) => bcrypt.compareSync(prev, current);

export { hashPassword, verifyPassword };