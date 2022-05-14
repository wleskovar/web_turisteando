/* Sistema de Ruteo */

const path = require('path');
const express = require('express');
const router = express.Router(); /* Router permite crear rutas montables y desmontables */
/* el metodo HTTP es llamado desde Router */

const contact_controller = require('../controllers/contact_controller.js');

/* rutas con controladores */
router.get('/', contact_controller.contact);

module.exports = router;