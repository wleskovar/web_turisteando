/* Sistema de Ruteo */

const path = require('path');
const express = require('express');
const router = express.Router(); /* Router permiete crear rutas montables y desmontables */
/* el metodo HTTP es llamado desde Router */

const paquetes_controllers = require('../controllers/paquetes_controller.js');

/* rutas con controladores */
router.get('/', paquetes_controllers.index_home);
router.get('/index', paquetes_controllers.index_home);




module.exports = router;