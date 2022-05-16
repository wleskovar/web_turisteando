const path = require('path');
const express = require('express');
const router = express.Router(); /* Router permite crear rutas montables y desmontables */
/* el metodo HTTP es llamado desde Router */

const select_controller = require('../controllers/select_controller.js');

/* rutas con controladores */
router.get('/', select_controller.show_select);


module.exports = router;