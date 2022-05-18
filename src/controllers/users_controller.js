const fs = require('fs');
const path= require('path');

const engine = require('../model/engine.js');




const users_controller = {
    login: (req, res) => {
        res.status(200).render('../views/users/login')
    },
    register: (req, res) => {
        res.status(200).render('../views/users/register')
    },
    add_user: (req, res) => {
        let user = {
            nombre: req.body.usuario,
            email: req.body.email,
            password: req.body.password,
            password_valid: req.body.password_valid
        };

        /* Guardar usuario*/
        let users_file = fs.readFileSync('data/users-prueba.json', {encoding: 'utf-8'});
        let users;
        if(users_file == "") {
            users = [];
        } else {
            users = JSON.parse(users_file);
        };

        users.push(user);

        usersJSON = JSON.stringify(users);

        fs.writeFileSync('data/users-prueba.json', usersJSON);

        res.status(200).redirect('/users/login'); //ruta de cierre del metodo POST
    },
    users_list: (req, res) => {
        let users_list = fs.readFileSync('users-prueba.json', {encoding: 'utf-8'});
        let users = JSON.parse(users_list);
        res.status(200).render('users_list', {'users': users})
    },
    view_users: (req, res) => {
        res.status(200).render('../views/users_admin')
    }
};

module.exports = users_controller;