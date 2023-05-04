const express = require('express');

const router = express.Router();

const comentarios = require('../controllers/comentarios.controller');

router.post('/comentar', comentarios.create);
router.get('/comentarios', comentarios.read);

module.exports = router;
