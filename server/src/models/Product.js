const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      image: DataTypes.STRING
    }, { sequelize })
  }
}

module.exports = Product;