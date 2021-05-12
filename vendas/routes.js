const router = require('express').Router();
const VendasModel = require('./model');
const Validator = require('../validator');

let requiredFields = {
  nome: {
    required: true,
  },
};

const vendasValidator = new Validator(requiredFields);

router.post('/', vendasValidator.getValidator(), async (req, res) => {
  await VendasModel.create(req.body);
  res.status(201).send();
});

router.get('/', async (req, res) => {
  let vendas = await VendasModel.findAll();
  res.status(200).json(vendas);
});

module.exports = router;
