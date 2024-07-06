import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function criarEpopularTabelaDeArmazem(sA, fluig, data, descricao) {
    const db = await open({
        filename: path.join(__dirname, 'banco.db'), // Caminho absoluto para o banco de dados
        driver: sqlite3.Database,
    });

    await db.run(`
        CREATE TABLE IF NOT EXISTS armazem (
            sA VARCHAR(6),
            fluig VARCHAR(6),
            data DATE,
            descricao TEXT
        )
    `);

    await db.run(`
        INSERT INTO armazem (sA, fluig, data, descricao)
        VALUES (?, ?, ?, ?)
    `, [sA, fluig, data, descricao]);

    await db.close();
}

// Rota correta para receber o POST dos dados do formulário
app.post('/api/criar-armazem', async (req, res) => {
    const { sA, fluig, data, descricao } = req.body;
    try {
        await criarEpopularTabelaDeArmazem(sA, fluig, data, descricao);
        res.status(200).send('Dados inseridos com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
        res.status(500).send('Erro ao inserir dados');
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

