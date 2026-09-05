const express = require('express');
const app = express();
const path = require('path');
const produtoController = require('./src/controllers/produtoController');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.urlencoded({ extended: true }));

// Rotas do CRUD
app.get('/', produtoController.listar);
app.get('/cadastrar', produtoController.exibirFormNovo);
app.get('/editar/:id', produtoController.exibirFormEditar);
app.post('/salvar', produtoController.salvar);
app.get('/deletar/:id', produtoController.deletar);

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});