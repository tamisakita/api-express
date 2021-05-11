const router = require('express').Router();
const UserModel = require('./model');

const validateUser = (req, res, next) => {
  let requiredFields = ['nome', 'cpf', 'email'];
  let { body } = req;
  for (let field of requiredFields) {
    if (!body[field]) {
      res.status(400).send(`O campo ${field} é obrigatório`)
      return;
    }
  }
  next();
}

router.get('/', async (req, res) => {
  const usuarios = await UserModel.findAll();
  res.status(200).json(usuarios);
});

router.post('/', validateUser, async (req, res) => {
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
