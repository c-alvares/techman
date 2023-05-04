const express = require('express');

const router = express.Router();

const profile = require('../controllers/perfis.controller');


router.get('/perfis', profile.read);


module.exports = router;
