/* Sistema de Ruteo para el administrador */

const path = require('path');
const express = require('express');
const multer= require('multer');
const router = express.Router(); /* Router permiete crear rutas montables y desmontables */


const admin_controllers = require('../controllers/admin_controllers.js');
const users_admin_controllers = require('../controllers/users_admin_controllers.js');
const uploadFile = require('../middlewares/multer_middleware'); 
const validations_package = require('../middlewares/validations_packge'); 

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
// defino la variable del Multer
const upload= multer({ storage: storage})



/* el metodo HTTP es llamado desde Router */
/* rutas con controladores */
router.get('/', admin_controllers.get_package_view);
// Rustas para crear paquetes GET y POST
router.get('/crear', admin_controllers.crear_package_get);
// En la ruta del post para crear un paquete va como middleware del Multar y el array con validaciones del express-validator
router.post('/crear', upload.single('turisteando_image'), validations_package, admin_controllers.crear_package_post);

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


//listar Ususarios
router.get('/users', users_admin_controllers.users_list);
// Detalle Usuario
router.get('/userDetail/:id', users_admin_controllers.show_user);

//Buscar Usuario

//Editar Usuario
router.get('/user/:id', users_admin_controllers.edit_user_get);

router.put('/user/edit',uploadFile.single('avatar'), users_admin_controllers.edit_user_put);

//Borrar Usuario
router.get('/user/:id/delete', users_admin_controllers.delete_user_get);
router.delete("/user/delete/:id", users_admin_controllers.delete_user_delete);

module.exports= router;