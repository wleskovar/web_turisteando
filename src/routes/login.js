// Sistema ruteo Login //

const express = require('express');
const path = require('path');
const loginController = require('../controllers/login_controller.js');
const router = express.Router();

router.get('/', loginController.login);

module.exports = router;
