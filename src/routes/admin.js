/* Sistema de Ruteo para el administrador */

const path = require('path');
const express = require('express');
const multer= require('multer');
const router = express.Router(); /* Router permiete crear rutas montables y desmontables */

const admin_controllers = require('../controllers/admin_controllers.js');

// configuro Multer para poder subir al servidor los archivos de las imagenes de paisajes
const storage= multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images'));
    },
    filename: function (req, file, cb) {
        const new_image = 'turisteando-' + Date.now() + file.originalname;
        cb(null, new_image);
    }
});

const upload= multer({ storage: storage})

/* el metodo HTTP es llamado desde Router */
/* rutas con controladores */
router.get('/', admin_controllers.get_package_view);
// Rustas para crear paquetes GET y POST
router.get('/crear', admin_controllers.crear_package_get);
// En la ruta del post para crear un paquete va como middleware del Multar
router.post('/crear', upload.single('turisteando_image'), admin_controllers.crear_package_post);

/* con la ruta /view muestro un paquete */
router.get('/productos', admin_controllers.lista_packages);
/* rutas para editar productos GET y POST */
router.get('/producto/:id', admin_controllers.edit_package_get);
// En la ruta del put para crear un paquete va como middleware del Multar
router.put('/producto/edit', upload.single('turisteando_image'), admin_controllers.edit_package_put);
/* rutas para borrar productos GET y DELETE */
router.get('/producto/:id/delete', admin_controllers.delete_package_get);
// En la ruta del delete para crear un paquete va como middleware del Multar
router.delete('/producto/delete/:id', admin_controllers.delete_package_delete);

module.exports= router;