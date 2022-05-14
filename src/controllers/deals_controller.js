/* Este controlador "deals_controller" implementa todos los metodos para
manejar los productos */

/* cargo el manejador de los paquetes del modelo */
const data_paquetes = require('../model/data_paquetes.js');
const engine = require('../model/engine.js');

const deals_controller = {
    show_deals: (req, res) => {
        let deals = engine.browse_table('productos');
        let data_deals = deals.filter((elemento) => elemento.package_category == "2");

        res.status(200).render('../views/deals', { data_deals: data_deals });
    },
    post_deal: (req, res) => {
        let data_deals = req.body.id;
        engine.add_columm('productos', data_deals);

        res.status(200).redirect('../views/productDetail');
    }
};

module.exports = deals_controller;