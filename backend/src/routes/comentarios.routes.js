const express = require('express');

const router = express.Router();

const comentarios = require('../controllers/comentarios.controller');

router.get('/comentarios', comentarios.read);
router.get('/comentariosequipamento/:equipamento_id', comentarios.readOne);
router.post('/comentar', comentarios.create);

module.exports = router;
