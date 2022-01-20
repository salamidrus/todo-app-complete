const bcrypt = require("bcrypt");
const SALT_ROUND = process.env.SALT_ROUND;

function hash(password) {
  return bcrypt.hashSync(password, Number(SALT_ROUND));
}

function compare(password, userPassword) {
  return bcrypt.compareSync(password, userPassword);
}

module.exports = {
  hash,
  compare,
};
