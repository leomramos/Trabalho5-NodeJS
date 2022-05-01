const Product = require('../models/Product');
const { Op } = require('sequelize');

module.exports = {
  async index() {
    return await Product.findAll();
  },
  async store(product) {
    return await Product.create(product);
  },
  async update(product) {
    return await Product.update(product, { where: { id: product.id } });
  },
  async destroy(id) {
    return await Product.destroy({ where: { id } });
  },
  async checkTitle(title, id) {
    if (id) {
      return await Product.findOne({ where: { [Op.and]: [{ title }, { id: { [Op.ne]: id } }] } });
    } else {
      return await Product.findOne({ where: { title } });
    }
  },
  async find(id) {
    return await Product.findByPk(id);
  }
}