const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

const PLUGGY_CLIENT_ID = '6bcc2bb0-e462-4bec-9a27-b124ac707658';
const PLUGGY_CLIENT_SECRET = 'b42acfdb-3166-4e80-ad66-06d376c20e25';

app.use(cors());
app.use(express.json());

app.get('/connect-token', async (req, res) => {
  try {
    const response = await axios.post('https://api.pluggy.ai/connect_token', {
      clientId: PLUGGY_CLIENT_ID,
      clientSecret: PLUGGY_CLIENT_SECRET,
    });
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao gerar connect_token:', error.response?.data || error.message);
    res.status(500).send('Erro ao gerar token');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
