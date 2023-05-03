const express = require('express');

const router = express.Router();

const comentarios = require('../controllers/comentarios.controller');

const Middle = require('../middleware/middleware');

router.put('*', Middle.acessValidator);
router.delete('*', Middle.acessValidator);

// router.post('/acessasformulariodepublicacaoblogasas', User.login);
// router.post('/cadastrarusuario', Middle.acessValidator, User.create);
router.get('/comentarios', comentarios.read);
// router.get('/buscarusuario/:id', User.readOne);
// router.put('/atualizardados/:id', User.update);
// router.delete('/excluirusuario/:id', User.remove);

module.exports = router;
