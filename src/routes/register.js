//  Sistema de ruteo Registro  //

const express = require('express');
const path = require('path');
const registerController = require('../controllers/register_controller.js');
const router = express.Router();

router.get('/', registerController.register);

module.exports = router;
