const path = require('path');

const { body } = require('express-validator'); // la funcion body es igual a la funcion check

// defino el array con las validaciones del express-validator
const validations_package= [
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

module.exports = validations_package;