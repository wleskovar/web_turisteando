// /* Sistema de Ruteo */

const path = require('path');
const express = require('express');
const router = express.Router(); /* Router permite crear rutas montables y desmontables */
/* el metodo HTTP es llamado desde Router */

const products_controller = require('../controllers/products_controller.js');

/* rutas con controladores */
router.get('/', products_controller.productDetail);
router.get('/:id', products_controller.show_product);
router.get('/opcion', products_controller.show_select);
router.post('/', products_controller.post_product);

module.exports = router;