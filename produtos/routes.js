const router = require('express').Router();
const ProdutosModel = require('./model');

router.post('/', async (req, res) => {
  let { body } = req;
  await ProdutosModel.create(body);
  res.status(201).send();
});

router.get('/', async (req, res) => {
  const produtos = await ProdutosModel.findAll();
  res.status(200).json(produtos);
});

router.delete('/:id', async (req, res) => {
  let { id } = req.params;
  await ProdutosModel.destroy({where: {id: id}});
  res.send(200).send();
});

router.put('/:id', async (req, res) => {
  let { id } = req.params;
  let produto = await ProdutosModel.findOne({where: {id: id}});

  let { nome, descricao, preco, estoque } = req.body;

  produto.nome = nome ? nome : produto.nome;
  produto.descricao = descricao ? descricao : produto.descricao;
  produto.preco = preco ? preco : produto.preco;
  produto.estoque = estoque ? estoque : produto.estoque;

  produto.save();

  res.status(200).json(produto);
});

module.exports = router;
