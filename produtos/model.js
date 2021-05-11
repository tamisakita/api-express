const Sequelize = require('sequelize');
const db = require('../db');

const ProdutosModel = db.define('produtos', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING(100),
  },
  marca: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  preco: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  estoque: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = ProdutosModel;