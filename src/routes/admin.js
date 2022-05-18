/* Sistema de Ruteo para el administrador */

const path = require('path');
const express = require('express');
const multer= require('multer');
const router = express.Router(); /* Router permiete crear rutas montables y desmontables */
const { body } = require('express-validator'); // la funcion body es igual a la funcion check

const admin_controllers = require('../controllers/admin_controllers.js');
const users_controller = require('../controllers/users_controller.js');

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
// defino el array con las validaciones del express-validator
const validations= [
    body('package_id')
        .notEmpty().withMessage('El código del paquete es obligatorio').bail()
        .isNumeric().withMessage('El código del paquete debe ser númerico'),
    body('package_name').notEmpty().withMessage('Ingresar el nombre del paquete'),
    body('package_alt_image').notEmpty().withMessage('Ingresar la leyenda de la imagen del paquete'),
    body('package_price')
        .notEmpty().withMessage('El precio del paquete es obligatorio').bail()
        .isNumeric().withMessage('El valor a ingresar es númerico'),
    body('package_title').notEmpty().withMessage('Ingresar el titulo del paquete para los clientes'),
    body('package_q_days')
        .notEmpty().withMessage('Ingresar la cantidad de días de alojamiento').bail()
        .isNumeric().withMessage('El valor a ingresar es númerico'),
    body('package_hotel').notEmpty().withMessage('El nombre del Hotel del paquete es obligatorio'),
    body('package_stars_hotel')
        .notEmpty().withMessage('Ingresar la categoria del hotel en estrellas').bail()
        .isNumeric().withMessage('El valor a ingresar es númerico'),
    body('package_description').notEmpty().withMessage('Ingrese la descripción del paquete para el usuario'),
    body('package_date_admission').notEmpty().withMessage('Ingrese la fecha de ingreso al hotel'),
    body('package_excursions_id').notEmpty().withMessage('Ingrese cero si no tiene excursiones incluidas o el codigo del paquete de excursiones'),
    body('package_discount')
        .notEmpty().withMessage('Ingrese el porcentaje de descuento sobre el precio del paquete').bail()
        .isNumeric().withMessage('El valor a ingresar es númerico'),
    body('turisteando_image').custom((value, { req }) => {
        let file = req.file;
        let accept_extensions = ['.jpeg', '.png', '.webp'];
        if (!file) {
            throw new Error('Debe subir una imagen para el paquete');
        } else {
            let file_extension = path.extname(file.originalname)
            if (!accept_extensions.includes(file_extension)) {
                throw new Error(`Las extenciones de archivos permitidas son ${accept_extensions.join(',')}`);
        }
       }
       return true;
    })
];

/* el metodo HTTP es llamado desde Router */
/* rutas con controladores */
router.get('/', admin_controllers.get_package_view);
// Rustas para crear paquetes GET y POST
router.get('/crear', admin_controllers.crear_package_get);
// En la ruta del post para crear un paquete va como middleware del Multar y el array con validaciones del express-validator
router.post('/crear', upload.single('turisteando_image'), validations, admin_controllers.crear_package_post);

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

/** ruta admin users */
router.get('/users', users_controller.view_users);

module.exports= router;