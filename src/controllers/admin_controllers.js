/* Este controlador "admin_controllers" implementa todos los metodos para
administrar el sitio web */
const { validationResult } = require('express-validator');

const engine= require('../model/engine.js'); // con este modulo operamos la base de datos

const admin_controllers = {
        // entro en el Home del administrados
        get_package_view: (req, res) => {
        res.status(200).render('../views/admin');
        },
        crear_package_get: (req, res) => {
            res.status(200).render('../views/products/package_crear');
        },
        crear_package_post: (req, res) => {
            // para procesar el formulario
            let data_package= req.body;
            data_package.package_price= parseFloat(data_package.package_price); // convierto el dato que vienen como string a un float para la DB
            data_package.package_discount= parseFloat(data_package.package_discount); // convierto el dato que vienen como string a un float para la DB
            /* guardo el nombre de la imagen que subieron para el paquete, si no subieron queda como null */
            if (req.file){
                data_package.package_image= req.file.filename;
            }else {
                data_package.package_image= null;
            }
            // Realizo la validacion de datos
            const resalt_validation = validationResult(req);
            if (resalt_validation.errors.length > 0) {
                res.status(200).render('../views/products/package_crear', {
                    errors : resalt_validation.mapped(),
                    old_data: req.body
                });
            }else {
                /* grabo los datos */
                engine.add_columm('productos', data_package);
                res.redirect('/admin');
            }
        },
        edit_package_get: (req, res) => {
            let package_id= req.params.id;
            let package= engine.read_columm('productos', package_id); 
            res.status(200).render('../views/products/package_edit', {package: package[0]}); //como envio un objeto literal uso el indice cero del array
        },
        edit_package_put: (req, res) => {
            let data_package= req.body;
            /* update los datos */
            let old_package= engine.read_columm('productos', data_package.package_id)
            data_package.package_price= parseFloat(data_package.package_price); // convierto el dato que vienen como string a un float para la DB
            data_package.package_discount= parseFloat(data_package.package_discount); // convierto el dato que vienen como string a un float para la DB
            /* guardo el nombre de la imagen que subieron para el paquete, si no subieron queda como null */
            if (req.file){
                data_package.package_image= req.file.filename;
            }else {
                data_package.package_image= old_package[0].package_image; //como uso un objeto literal uso el indice cero del array
            }
            
            /* actualizo la base de datos */
            engine.edit_columm('productos', data_package);
            res.redirect('/admin');
        },
        delete_package_get: (req, res) => {
            let package_id= req.params.id;
            let package= engine.read_columm('productos', package_id); 
            res.status(200).render('../views/products/package_delete', {package: package[0]}); //como envio un objeto literal uso el indice cero del array
        },
        delete_package_delete: (req, res) => {
            let package_id= req.params.id;
            engine.delete_columm('productos', package_id); 
            res.redirect('/admin');
        },
        
        /* metodo para mostrar un paquete */
        lista_packages: (req, res) => {
            let package_table= engine.browse_table('productos');
            res.status(200).render('../views/productos_admin', {package_table: package_table});
        }

};

module.exports = admin_controllers;