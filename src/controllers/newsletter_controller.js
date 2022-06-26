//const fs = require('fs');
const path = require('path');

/* cargo el manejador de los paquetes del modelo */
const engine = require('../model/engine.js');

const newsletter_controller = {
    new_register: (req, res) => {
        let register = req.body

        let registers = engine.add_columm("newsletter", register);

        res.status(200).redirect('/');
    }
};

module.exports = newsletter_controller;