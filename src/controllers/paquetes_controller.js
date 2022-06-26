/* Este controlador "paquetes_controllers" implementa todos los metodos para
manejar los paquetes */


/* cargo el manejador de los paquetes del modelo */
const data_paquetes = require('../model/data_paquetes.js');
const engine= require('../model/engine.js'); // con este modulo operamos la base de datos

// Notas: cambios para refactorizar el codigo para el uso de MySQL
// se incluye el "async" y el "await" porque se pasa de trabajar de una forma sincronica a una asincronica
// se recibe una promesa y hay que resolverla en este punto

const paquetes_controllers = {
    index_home: async (req, res) => {
        // hay que pasar como argumento el nombre de la tabla segun el modelo, ahora "Producto"
        let lista_paquetes= await engine.browse_table_db('Producto'); 
        let lista_index= lista_paquetes.filter((elemento) => elemento.package_index == 1)
        let index_paquetes= lista_index.filter((elemento) => elemento.package_category == 1)

        let index_ofertas= lista_index.filter((elemento) => elemento.package_category == 2)
        //res.send(index_paquetes); // para probar con Postman
        res.render('../views/index', {index_paquetes: index_paquetes, index_ofertas: index_ofertas, selector_paquetes: lista_paquetes});
    }
};

module.exports = paquetes_controllers;