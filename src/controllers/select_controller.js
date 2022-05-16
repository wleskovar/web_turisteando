const access_database = require('../model/access_database.js');
const engine = require('../model/engine.js');

const select_controller = {
        show_select: (req, res) => {
        let paquete = req.query.paquete;
        let package = engine.read_columm('productos', paquete); 
        res.status(200).render('../views/productDetail', { package: package[0] });
    }
};

module.exports = select_controller;