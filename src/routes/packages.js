/* Sistema de Ruteo */

const path = require('path');
const express = require('express');
const router = express.Router(); /* Router permite crear rutas montables y desmontables */
/* el metodo HTTP es llamado desde Router */

const packages_controller = require('../controllers/packages_controller.js');

/* rutas con controladores */
router.get('/', packages_controller.show_packages);
router.post('/', packages_controller.post_package);

module.exports = router;