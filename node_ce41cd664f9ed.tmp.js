import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';


const app = express();
app.use(cors(
    {
        origin: '*',
    }
));
const port = 3000;
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function criarEpopularTabelaDeArmazem(sA, fluig, data, descricao) {
    // Abre o banco de dados
    const db = await open({
        filename: path.join(__dirname, 'banco.db'),
        driver: sqlite3.Database
    });

    // Cria a tabela se não existir
    await db.exec(`
        CREATE TABLE IF NOT EXISTS armazem (
            sA TEXT,
            fluig TEXT,
            data TEXT,
            descricao TEXT
        )
    `);

    // Insere os dados na tabela
    await db.run(`
        INSERT INTO armazem (sA, fluig, data, descricao)
        VALUES (?, ?, ?, ?)
    `, [sA, fluig, data, descricao]);

    // Fecha o banco de dados
    await db.close();
}

// para criar e popular a tabela
app.post('http://192.168.30.85:3000/api/criar-armazem', async (req, res) => {
    const { sA, fluig, data, descricao } = req.body;

    if (!sA || !data || !descricao) {
        res.status(400).send('Campos obrigatórios ausentes: SA, Data, ou Descrição.');
        return;
    }

    try {
        await criarEpopularTabelaDeArmazem(sA, fluig, data, descricao);
        res.status(200).send('Dados inseridos com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
        res.status(500).send('Erro ao inserir dados');
    }
});

// Servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
