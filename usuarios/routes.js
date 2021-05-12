const router = require('express').Router();
const UserModel = require('./model');
const Validator = require('../validator');
const ProdutosModel = require('../produtos/model');

let requiredFields = { 
  nome: {
    required: true,
  },
  cpf: {
    required: true,
  },
  email: {
    required: true,
  },
}

const usuarioValidator = new Validator(requiredFields);

router.get('/', async (req, res) => {
  const usuarios = await UserModel.findAll({ include: ProdutosModel});
  res.status(200).json(usuarios);
});

router.post('/', usuarioValidator.getValidator(), async (req, res) => {
  await UserModel.create(req.body);
  res.status(201).send();
});

router.delete('/:id', async (req, res) => {
  let { id } = req.params;
  await UserModel.destroy({where: {id: id}});
  res.send();
});

router.put('/:id', async (req, res) => {
  let { nome, email } = req.body;
  let { id } = req.params;

  let usuario = await UserModel.findOne({where: {id: id}});

  usuario.nome = nome;
  usuario.email = email;

  usuario.save();

  res.status(200).json(usuario);
});

module.exports = router;
