require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post('/gerar-texto', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt é obrigatório! 🔎' });
    }

    try {
        const response = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo'
        });

        const respostaGerada = response.choices[0].message.content;
        res.json({ resposta: respostaGerada });

    } catch (error) {
        console.error('Erro ao gerar resposta do Chat:', error);
        res.status(500).json({ error: 'Erro interno ao gerar resposta' });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});