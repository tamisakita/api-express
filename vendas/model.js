const Sequelize = require('sequelize');
const db = require('../db');
const ProdutosModel = require('../produtos/model');
const UsuarioModel = require('../usuarios/model');

const VendasModel = db.define('vendas', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  usuarioId: {
    type: Sequelize.INTEGER,
    references: {
      model: UsuarioModel,
      key: 'id',
    },
  },
  produtoId: {
    type: Sequelize.INTEGER,
    references: {
      model: ProdutosModel,
      key: 'id',
    },
  },
  quantidade: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

UsuarioModel.belongsToMany(ProdutosModel, { through: VendasModel });
ProdutosModel.belongsToMany(UsuarioModel, { through: VendasModel });

module.exports = VendasModel;
