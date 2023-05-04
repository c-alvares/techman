const express = require('express');

const router = express.Router();

const equipamentos = require('../controllers/equipamentos.controller');

const Middle = require('../middleware/middleware');

router.post('/cadastrarequipamento', Middle.acessValidator, equipamentos.create);
router.get('/equipamentos', equipamentos.read);
router.get('/equipamento/:id', equipamentos.readOne);
router.delete('/excluirequipamento/:id', Middle.acessValidator, equipamentos.remove);

module.exports = router;
