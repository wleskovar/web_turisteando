/* Este controlador "products_controller" implementa todos los metodos para
manejar los productos */

const access_database = require('../model/access_database.js');
const engine = require('../model/engine.js');

const products_controller = {
    productDetail: (req, res) => {
        let package = access_database.package_db();
        res.status(200).render('../views/productDetail', { package: package });
    },
    show_product: (req, res) => {
        let package_id = req.params.id;
        let package = engine.read_columm('productos', package_id); 
        res.status(200).render('../views/productDetail', { package: package[0] });
    },
    post_product: (req, res) => {
        let data_package = req.body.id;
        engine.add_columm('productos', data_package);
        res.status(200).redirect('../views/productCart');
    }
};

module.exports = products_controller;