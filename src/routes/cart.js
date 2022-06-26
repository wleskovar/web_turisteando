/* Sistema de Ruteo */

const path = require('path');
const express= require('express');
const auth_middleware = require("../middlewares/auth_middleware");

const router= express.Router(); /* Router permiete crear rutas montables y desmontables */
/* el metodo HTTP es llamado desde Router */
// validar formulario
const {body} = require("express-validator")
const validator_cart_form =[
    //select
    body("mayores").notEmpty().withMessage("Debes indicar cuantos mayores viajaran"), 
    body("menores").notEmpty().withMessage("Debes indicar cuantos menores viajaran"), 

    body("first_name").notEmpty().withMessage("Debes ingresar un nombre"), 
    body("last_name").notEmpty().withMessage("Debes ingresar un apellido"), 
    body("birth_date")
                    .notEmpty().withMessage("Debes ingresar una fecha de nacimiento").bail()
                    .isDate().withMessage("Debes ingresar un formato de fecha válido"),
    body("age").notEmpty().withMessage("Debes ingresar la edad"),
    body("identity_document")
                    .notEmpty().withMessage("Debes ingresar un numero de documento").bail()
                    .isLength({min: 6 ,max:10}).withMessage("Debes ingresar 6 digitos cómo mínimo"),
    body("home").notEmpty().withMessage("Debes ingresar un domicilio"),
    body("postal_code").notEmpty().withMessage("Debes ingresar un código postal"),
    body("province").notEmpty().withMessage("Debes indicar una Provincia de residencia"),
    body("email")
                .notEmpty().withMessage("Debes ingresar un email válido").bail()
                .isEmail().withMessage("Debes Ingresar un formato válido, ej: facundo@gmail.com"),
    body("phone_number")
                .notEmpty().withMessage("Debes ingresar un número de teléfono valido").bail()
                .isNumeric().withMessage("Este campo solo recibe valores numéricos").bail()
                .isLength({min: 6 ,max:10}).withMessage("Debes ingresar un número válido de la menos 6 caracteres"),
  
    //radio
    /*body("payment_method").notEmpty().withMessage("Indica como quieres pagar"),
    body("payment_method").notEmpty().withMessage("Indica como quieres pagar"),*/
    body("card_number")
                .notEmpty().withMessage("Ingresa los 16 dígitos ubicados en el frente de la tarjeta").bail()
                .isLength({min:16, max:16}).withMessage("Ingresa los 16 dígitos ubicados en el frente de la tarjeta"),
    body("name_card_holder").notEmpty().withMessage("Ingresa el nombre del titular de la tarjeta"),
    body("expiration")
                .notEmpty().withMessage("Ingresa la fecha de vencimiento de la tarjeta").bail()
                .isLength({min:4, max:4}).withMessage("Ingresa fecha válida. Ej: 10/22"),
    body("security_code")
                .notEmpty().withMessage("Ingresa el código de seguridad de la tarjeta").bail()
                .isLength({min:3, max:4}).withMessage("El código de seguridad contiene entre 3 y 4 caracteres"),

]

const cart_controller = require('../controllers/cart_controller.js');
const { default: isMobilePhone } = require('validator/lib/isMobilePhone');



//Listar  Carrito//
router.get("/", cart_controller.show_cart);

//Agregar Item al Carrito
router.post("/add/:id",auth_middleware, cart_controller.add_item);

//Eliminar 
router.delete("/delete/:id",  cart_controller.delete_item);

//Comprar
router.get("/purchase",auth_middleware, cart_controller.purchase );

router.post("/purchase",/*validator_cart_form*/ cart_controller.process_purchase);

//formulario de compra/
//router.get("/add/:id/purchase", cart_controller.purchase );
//router.post("/add/:id/purchase",/*validator_cart_form*/ cart_controller.process_purchase );





module.exports = router