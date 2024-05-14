
const users = require('../models/user');
const bcrypt = require('bcrypt');

const verifyPassword = async (user, password) => {
  try {
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
  } catch (error) {
    console.error(`Error comparing password for user ${user.username}`, error);
    throw error; // Throw an error to handle it in the calling function
  }
}


module.exports = {
  verifyPassword, 
};