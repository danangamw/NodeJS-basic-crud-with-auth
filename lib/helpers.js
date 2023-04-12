const bcrpyt = require('bcrypt');

const helpers = {};

helpers.encryptPassword = async (password) => {
  const encryptedPassword = await bcrpyt.hash(password, 10);
  return encryptedPassword;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrpyt.compare(password, savedPassword);
  } catch (e) {
    console.log(e);
  }
};

module.exports = helpers;
