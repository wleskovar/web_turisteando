const fs = require('fs');
const path = require('path');

/* cargo el manejador de los paquetes del modelo */
const engine = require('../model/engine.js');

/* defino las variables del entorno */
//const path_relative = path.join(__dirname, '../../data')

// const newsletter_controller = {
//     new_register: (req, res) => {
//         let register = req.body

//         let registers = engine.add_columm("newsletter", register);
//        // console.log(register);
//        // res.status(200).redirect('/'); //ruta de cierre del metodo POST
//     }
// };

const newsletter_controller = {
    new_register: (req, res) => {
        let register = req.body;

            /* Guardar registro */
            let newsletter_file = fs.readFileSync('data/newsletter.json', {encoding: 'utf-8'});
            let registers;
            if(newsletter_file == "") {
                registers = [];
            } else {
                registers = JSON.parse(newsletter_file);
            };

            registers.push(register);

            registersJSON = JSON.stringify(registers);

            fs.writeFileSync('data/newsletter.json', registersJSON);

            res.status(200).redirect('/'); //ruta de cierre del metodo POST
        }
    };

module.exports = newsletter_controller;