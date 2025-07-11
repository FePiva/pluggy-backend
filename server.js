
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // Para carregar variáveis de ambiente se usar .env localmente

const app = express();
const port = process.env.PORT || 3000;

// Permitir requisições de outras origens
app.use(cors());
app.use(express.json());

// Rota opcional de teste para confirmar que o backend está rodando
app.get('/', (req, res) => {
  res.send('Backend do Pluggy está rodando!');
});

// Rota para obter o connect_token da Pluggy
app.get('/connect-token', async (req, res) => {
  try {
    const response = await axios.post('https://api.pluggy.ai/connect_token', {
      clientId: process.env.PLUGGY_CLIENT_ID,
      clientSecret: process.env.PLUGGY_CLIENT_SECRET,
    });

    res.json({ token: response.data.token });
  } catch (error) {
    console.error('Erro ao gerar connect_token:', error.response?.data || error.message);
    res.status(500).send('Erro ao gerar token');
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
