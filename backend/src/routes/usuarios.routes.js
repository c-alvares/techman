const express = require('express');

const router = express.Router();

const User = require('../controllers/usuarios.controller');


router.get('/listarusuarios', User.read);
router.post('/login', User.login);


module.exports = router;
