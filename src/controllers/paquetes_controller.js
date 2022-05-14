/* Este controlador "paquetes_controllers" implementa todos los metodos para
manejar los paquetes */


/* cargo el manejador de los paquetes del modelo */
const data_paquetes = require('../model/data_paquetes.js');
const engine= require('../model/engine.js'); // con este modulo operamos la base de datos

const paquetes_controllers = {
    index_home: (req, res) => {
        let lista_paquetes= engine.browse_table('productos');
        let lista_index= lista_paquetes.filter((elemento) => elemento.package_index == 'true')
        let index_paquetes= lista_index.filter((elemento) => elemento.package_category == 1)

        let index_ofertas= lista_index.filter((elemento) => elemento.package_category == 2)
        res.render('../views/index', {index_paquetes: index_paquetes, index_ofertas: index_ofertas});
    }
};

module.exports = paquetes_controllers;