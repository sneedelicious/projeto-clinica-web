const express = require('express');
const router = express.Router();
const axios = require('axios');

// Rota para buscar endereço por CEP
// GET /api/cep/22765007
router.get('/:cep', async (req, res) => {
  try {
    const { cep } = req.params;
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (response.data.erro) {
      return res.status(404).json({ error: 'CEP não encontrado.' });
    }

    const { logradouro, localidade, uf } = response.data;
    res.json({ street: logradouro, city: localidade, state: uf });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar o CEP.' });
  }
});

module.exports = router;