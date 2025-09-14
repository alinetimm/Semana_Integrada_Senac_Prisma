const express = require('express');
const eventosRouter = require('./servidor');

const app = express();

// Middleware para entender JSON nas requisições
app.use(express.json()); 

// Middleware para servir os arquivos estáticos da pasta 'public'
app.use(express.static('public')); 

// Todas as rotas da API ficam em /eventos
app.use('/eventos', eventosRouter);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
  console.log('Acesse o site em http://localhost:3000');
});