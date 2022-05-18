/* Sistema de Ruteo */

const path = require('path');
const express = require('express');
const router = express.Router(); /* Router permite crear rutas montables y desmontables */
/* el metodo HTTP es llamado desde Router */

const newsletter_controller = require('../controllers/newsletter_controller.js');

/* rutas con controladores */
router.post('/', newsletter_controller.new_register);

module.exports = router;