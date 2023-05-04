const express = require('express');

const router = express.Router();

const comentarios = require('../controllers/comentarios.controller');

router.post('/comentar', comentarios.create);
router.get('/comentarios', comentarios.read);
// router.get('/buscarusuario/:id', User.readOne);
// router.put('/atualizardados/:id', comentarios.update);
// router.delete('/excluirusuario/:id', comentarios.remove);

module.exports = router;
