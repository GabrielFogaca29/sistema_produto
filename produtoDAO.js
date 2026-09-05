const db = require('./conexao');

class ProdutoDAO {
    async listar() {
        const [rows] = await db.query('SELECT * FROM produtos');
        return rows;
    }

    async buscarPorId(id) {
        const [rows] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
        return rows[0];
    }

    async criar(produto) {
        const sql = 'INSERT INTO produtos (nome, categoria, preco, estoque) VALUES (?, ?, ?, ?)';
        const [resultado] = await db.query(sql, [
            produto.nome, 
            produto.categoria, 
            produto.preco, 
            produto.estoque
        ]);
        return resultado;
    }

    async atualizar(id, produto) {
        const sql = 'UPDATE produtos SET nome = ?, categoria = ?, preco = ?, estoque = ? WHERE id = ?';
        const [resultado] = await db.query(sql, [
            produto.nome, 
            produto.categoria, 
            produto.preco, 
            produto.estoque, 
            id
        ]);
        return resultado;
    }

    async deletar(id) {
        const sql = 'DELETE FROM produtos WHERE id = ?';
        const [resultado] = await db.query(sql, [id]);
        return resultado;
    }
}

module.exports = new ProdutoDAO();