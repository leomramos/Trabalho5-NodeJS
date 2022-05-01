const User = require('../models/User');

module.exports = {
  async login() {
    return await User.findAll();
  },
  async store(user) {
    return await User.create(user);
  },
  async checkAccount(email) {
    return await User.findOne({ where: { email } });
  }
}