const express = require('express');

const router = express.Router();

const equipamentos = require('../controllers/equipamentos.controller');

const Middle = require('../middleware/middleware');

router.put('*', Middle.acessValidator);
router.delete('*', Middle.acessValidator);

// router.post('/acessasformulariodepublicacaoblogasas', User.login);
router.post('/cadastrarequipamento', Middle.acessValidator, equipamentos.create);
router.get('/equipamentos', equipamentos.read);
// router.get('/buscarusuario/:id', User.readOne);
// router.put('/atualizardados/:id', User.update);
// router.delete('/excluirusuario/:id', User.remove);

module.exports = router;
