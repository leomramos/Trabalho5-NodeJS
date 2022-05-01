const Product = require('../models/Product');

module.exports = {
  async index() {
    return await Product.findAll();
  },
  async store(req, res) {

  },
  async update(req, res) {

  },
  async destroy(id) {
    return await Product.destroy({ where: { id } });
  }
}

// .catch(err => { throw new Error(err.message) })