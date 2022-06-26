/* Este controlador "admin_controllers" implementa todos los metodos para
administrar el sitio web */
const { validationResult } = require('express-validator');
const db = require('../../database/models');
const Op = db.Sequelize.Op;
// requiero el paquete "date-and-time" para manejar el formato de fecha que vienen de la base de datos.
// ejemplo como vienen de la base de datos: "Mon Aug 15 2022 21:00:00 GMT-0300 (Argentina Standard Time)"."
const date = require('date-and-time');

const engine= require('../model/engine.js'); // con este modulo operamos la base de datos

const admin_controllers = {
        // entro en el Home del administrados
        get_package_view: (req, res) => {
        res.status(200).render('../views/admin');
        },
        crear_package_get: (req, res) => {
            res.status(200).render('../views/products/package_crear');
        },
        crear_package_post: async (req, res) => {
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
                let paquete_ordenado_db = ordenar_para_db(data_package);
                let estado = await engine.add_columm_db('Producto', paquete_ordenado_db);
                if (estado != 201) {
                    console.log('error al crear el paquete')
                }else {
                    res.redirect('/admin');
                }
            }
        },
        edit_package_get: async (req, res) => {
            let package_id= req.params.id;
            let package= await engine.read_columm_db('Producto', package_id);
            let fecha_admision = {fecha: date.format(package.package_date_admission, 'YYYY-MM-DD', true)};
            res.status(200).render('../views/products/package_edit', {package: package, fecha_admision: fecha_admision}); //como envio un objeto literal uso el indice cero del array
        },
        edit_package_put: async (req, res) => {
            let data_package= req.body;
            /* update los datos */
            let old_package= await engine.read_columm_db('Producto', data_package.package_id);
            data_package.package_price= parseFloat(data_package.package_price); // convierto el dato que vienen como string a un float para la DB
            data_package.package_discount= parseFloat(data_package.package_discount); // convierto el dato que vienen como string a un float para la DB
            /* guardo el nombre de la imagen que subieron para el paquete, si no subieron queda como null */
            if (req.file){
                data_package.package_image= req.file.filename;
            }else {
                data_package.package_image= old_package.package_image; 
            };
            /* actualizo la base de datos */
            let paquete_ordenado_db = ordenar_para_db(data_package);
            engine.edit_columm_db('Producto', paquete_ordenado_db);
            res.redirect('/admin');
        },
        delete_package_get: async (req, res) => {
            let package_id= req.params.id;
            let package= await engine.read_columm_db('Producto', package_id);
            let fecha_admision = {fecha: date.format(package.package_date_admission, 'YYYY-MM-DD', true)}; 
            res.status(200).render('../views/products/package_delete', {package: package, fecha_admision: fecha_admision}); 
        },
        delete_package_delete: async (req, res) => {
            let package_id= req.params.id;
            await engine.delete_columm_db('Producto', package_id); 
            res.redirect('/admin');
        },
        
        /* metodo para mostrar un paquete */
        lista_packages: async (req, res) => {
            let package_table= await engine.browse_table_db('Producto');
             package_table.forEach(element => {
                // Le don formato a element.package_date_admission, 'YYYY-MM-DD' para visulizar bien la fecha
                element.package_date_admission =(date.format(element.package_date_admission, 'DD/MM/YYYY', true))           
            });
            res.status(200).render('../views/productos_admin', {package_table: package_table});
        },
                
    };

function ordenar_para_db(data_package) {
    let objeto_paquete = {
        package_id: data_package.package_id,
        package_name: data_package.package_name,
        package_image: data_package.package_image,
        package_alt_image: data_package.package_alt_image,
        package_price: data_package.package_price,
        package_title: data_package.package_title,
        package_q_days: data_package.package_q_days,
        package_hotel: data_package.package_hotel,
        package_description: data_package.package_description, 
        package_date_admission: data_package.package_date_admission,
        package_index: data_package.package_index,
        package_category: data_package.package_category,
        package_transportation: data_package.package_transportation,
        package_excursions_id: data_package.package_excursions_id,
        package_discount: data_package.package_discount,
    }
    return objeto_paquete;
}
    
module.exports = admin_controllers;