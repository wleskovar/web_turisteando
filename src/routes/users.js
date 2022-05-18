//  Sistema de ruteo Usuarios  //

const path = require('path');
const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users_controller');

/* Rutas controladores usuarios */

/* Registro usuario */
router.get('/register', users_controller.register);
router.post('/register', users_controller.add_user);

/** Login usuario */
router.get('/login', users_controller.login);

module.exports = router;