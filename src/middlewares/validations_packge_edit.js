const path = require('path');

const { body } = require('express-validator'); // la funcion body es igual a la funcion check

// defino el array con las validaciones del express-validator
const validations_package= [
    body('package_name').notEmpty().withMessage('Ingresar el nombre del paquete'),
    body('package_alt_image').notEmpty().withMessage('Ingresar la leyenda de la imagen del paquete'),
    body('package_price')
        .notEmpty().withMessage('El precio del paquete es obligatorio').bail()
        .isNumeric().withMessage('El valor a ingresar es númerico'),
    body('package_title').notEmpty().withMessage('Ingresar el titulo del paquete para los clientes'),
    body('package_q_days')
        .notEmpty().withMessage('Ingresar la cantidad de días de alojamiento').bail()
        .isNumeric().withMessage('El valor a ingresar es númerico'),
    body('package_description').notEmpty().withMessage('Ingrese la descripción del paquete para el usuario'),
    body('package_date_admission').notEmpty().withMessage('Ingrese la fecha de ingreso al hotel'),
    body('package_discount')
        .notEmpty().withMessage('Ingrese el porcentaje de descuento sobre el precio del paquete').bail()
        .isNumeric().withMessage('El valor a ingresar es númerico'),
    
];

module.exports = validations_package;