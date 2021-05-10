const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Meu primeiro server');
});

app.get('/hello', (req, res) => {
  res.send('Oi mundo!');
});

app.listen(3000, () => {
  console.log('Server rodando na porta 3000');
});
