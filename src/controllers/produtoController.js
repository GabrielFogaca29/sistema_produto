const produtoDAO = require('../dao/produtoDAO');

exports.listar = async (req, res) => {
    try {
        const produtos = await produtoDAO.listar();
        res.render('index', { produtos });
    } catch (erro) {
        res.status(500).send('Erro ao carregar produtos');
    }
};

exports.exibirFormNovo = (req, res) => {
    res.render('form', { produto: null });
};

exports.exibirFormEditar = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await produtoDAO.buscarPorId(id);
        res.render('form', { produto });
    } catch (erro) {
        res.status(500).send('Erro ao buscar dados do produto');
    }
};

exports.salvar = async (req, res) => {
    try {
        const { id, nome, categoria, preco, estoque } = req.body;
        if (id) {
            await produtoDAO.atualizar(id, { nome, categoria, preco, estoque });
        } else {
            await produtoDAO.criar({ nome, categoria, preco, estoque });
        }
        res.redirect('/');
    } catch (erro) {
        res.status(500).send('Erro ao salvar produto');
    }
};

exports.deletar = async (req, res) => {
    try {
        const { id } = req.params;
        await produtoDAO.deletar(id);
        res.redirect('/');
    } catch (erro) {
        res.status(500).send('Erro ao excluir produto');
    }
};