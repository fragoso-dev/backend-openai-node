require("dotenv").config();
const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apikey: process.env.OPENAI_API_KEY,
});

app.post("/gerar-texto", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt é obrigatório!" });
  }

  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });
  } catch (error) {
    console.error("Erro ao gerar resposta do chat", error);
    res.status(500).json({ error: "Erro interno ao obter resposta" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`[ Jarbas ] - Servidor rodando em https://localhost:${PORT}`);
});
