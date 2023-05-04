const express = require('express');

const router = express.Router();

const equipamentos = require('../controllers/equipamentos.controller');

const Middle = require('../middleware/middleware');

router.post('*', Middle.acessValidator);
router.put('*', Middle.acessValidator);
router.delete('*', Middle.acessValidator);

router.post('/cadastrarequipamento', equipamentos.create);
router.get('/equipamentos', equipamentos.read);
router.get('/equipamento/:id', equipamentos.readOne);
router.delete('/excluirequipamento/:id', equipamentos.remove);

module.exports = router;
