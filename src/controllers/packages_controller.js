/* Este controlador "packages_controller" implementa todos los metodos para
manejar los productos */

/* cargo el manejador de los paquetes del modelo */
const data_paquetes = require('../model/data_paquetes.js');
const engine = require('../model/engine.js');

const packages_controller = {
    /*packages: (req, res) => {
        res.status(200).render('../views/packages', {data_paquetes: data_paquetes });
    },*/
    show_packages: (req, res) => {
        let packages = engine.browse_table('productos');
        let data_packages = packages.filter((elemento) => elemento.package_category == "1");

        res.status(200).render('../views/packages', { data_packages: data_packages });
    },
    post_package: (req, res) => {
        let data_packages = req.body.id;
        engine.add_columm('productos', data_packages);

        res.status(200).redirect('../views/productDetail');
    }
};

module.exports = packages_controller;