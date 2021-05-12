const router = require('express').Router();
const VendasModel = require('./model');

router.post('/', async (req, res) => {
  await VendasModel.create(req.body);
  res.status(201).send();
});

router.get('/', async (req, res) => {
  let vendas = await VendasModel.findAll();
  res.status(200).json(vendas);
});

module.exports = router;
