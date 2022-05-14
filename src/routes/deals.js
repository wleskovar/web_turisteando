/* Sistema de Ruteo */

const path = require('path');
const express = require('express');
const router = express.Router(); /* Router permite crear rutas montables y desmontables */
/* el metodo HTTP es llamado desde Router */

const deals_controller = require('../controllers/deals_controller.js');

/* rutas con controladores */
router.get('/', deals_controller.show_deals);
router.post('/', deals_controller.post_deal);

module.exports = router;