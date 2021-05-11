const router = require('express').Router();
const Sequelize = require('sequelize');
const db = require('../db');

const ProdutoSchema = db.define('produtos', {
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
  preço: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
});

const validateProduto = (req, res, next) => {
  let requiredFields = ['nome', 'preço'];
  let { body } = req;
  for (let field of requiredFields) {
    if (!body[field]) {
      res.status(400).send(`O campo ${field} é obrigatório`)
      return;
    }
  }
  next();
};

router.get('/', async (req, res) => {
  const usuarios = await ProdutoSchema.findAll();
  res.status(200).json(usuarios);
});

router.post('/', validateProduto, async (req, res) => {
  await ProdutoSchema.create(req.body);
  res.status(201).send();
});

router.delete('/:id', async (req, res) => {
  let { id } = req.params;
  await ProdutoSchema.destroy({where: {id: id}});
  res.send();
});

router.put('/:id', async (req, res) => {
  let { nome, preço } = req.body;
  let { id } = req.params;

  let produto = await ProdutoSchema.findOne({where: {id: id}});

  produto.nome = nome;
  produto.preço = preço;

  produto.save();

  res.status(200).json(produto);
});

module.exports = router;
