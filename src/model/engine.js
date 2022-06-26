/* funciones de desarrollo */
function l (arg) {
    console.log(arg);
};

/* engine_json es un modelo BREAD para archivos JSON */

// seccion de modulos requiridos
const fs= require('fs');
const path= require('path');
const db = require('../../database/models');
const Op = db.Sequelize.Op;

/* defino las variables del entorno */
const path_relative= path.join(__dirname, '../../data/')

/* ================================================================================ */

/*Tabla es el archivo (paquetes)
Columna es el registropaquete especifico, por ejemplo Bariloche.)
Item es el campo//un campo del paquete, por ejemplo, id o categoria o el hotel*/

const engine= {
    // se implementa un meto para trae todos los valores de un item de la tabla
    browse_table: function(name_table) {
        return this.read_json(name_table);
    },
    browse_table_db: function(name_table) {
        // se implemento el metodo "read_db para obtener los datos desde MySQL"
        return this.read_db(name_table);
    },
    // este metodo trae una columm de la table 
    read_columm: function(name_table, columm_table_id) {
        let registro= this.find_columm(name_table, columm_table_id);    
        return registro;
    }, 
    // este metodo trae una columm de la table de MySQL por clave primaria
    read_columm_db: function(name_table, columm_table_id) {
        let registro= db[name_table].findByPk(columm_table_id, {
            // en el include se obtienen los datos de las tablas relacionadas "hotels" y "tours"
            include: [{association:"hotel"}, {association:"tour"}]
        });
        return registro;
    }, 
    // este metodo permite modificar los items de una columm de la table
    edit_columm: function(name_table, object_modified) {
        let id= Object.values(object_modified)[0];
        this.delete_columm(name_table, id);
        this.add_columm(name_table, object_modified);
    }, 
    // este metodo permite modificar los items de una columm de la table
    edit_columm_db: function(name_table, object_modified) {
        db[name_table].update(
            object_modified, {
            where: {
                package_id: object_modified.package_id
            }
        }, {
            include: [{association:"hotel"}, {association:"tour"}]
        });
        return 201;    
    }, 
    // este metodo permite dar de alta una columm en la table
    add_columm: function (name_table, object_add) {
        let file_string= this.browse_table(name_table);
        //file_string.push(object_add);
        file_string= this.string_order(object_add, file_string);
        this.write_json(name_table, file_string);
    },
    // este metodo permite dar de alta una columm en la table de MySql
    add_columm_db: function (name_table, object_add) {
        db[name_table].create(object_add);
        return 201;
    },
    // este metodo permite borrar una columm de la table
    delete_columm: function(name_table, columm_table_id) {
        let file_string= this.read_json(name_table);
        let file_new= file_string.filter( element => Object.values(element)[0] != columm_table_id);
        this.write_json(name_table, file_new);
    }, 
    delete_columm_db: function(name_table, columm_table_id) {
        db[name_table].destroy({
            where: {
                package_id: columm_table_id
             }
        });
        return 200;
    }, 

    delete_all_columm: function (name_table){
           
            let file_string= engine.read_json(name_table);
            let file_new= file_string.filter( element => file_string[0] == undefined);
            engine.write_json(name_table, file_new);
    },
    /* Funciones utilizadas por los metodos */

    read_json: function (name_table) {
        return JSON.parse(fs.readFileSync(`${path_relative + name_table}.json`, 'utf-8',
        err => (err)? console.log('ERROR al leer archivo JSON'): ''));
    },
    
    read_db: function (name_table) {
            return db[name_table].findAll({
                // en el include se obtienen los datos de las tablas relacionadas "hotels" y "tours"
                include: [{association:"hotel", include: [{association:"province"}]}, {association:"tour"}],
                // Los parametros "raw en true" y "nest en true" son para obtener un objeto plano
                raw: true,
                nest: true,
            });
    },

    write_json: function (name_table, file_string){
        let file_json= JSON.stringify(file_string);
        fs.writeFileSync(`${path_relative + name_table}.json`,file_json, 
                        err => (err)? console.log('ERROR al grabar archivo JSON'): '');
    },


    /* esta funcion retorna la columm buscada, recibe el array con todos los objetos
    y el nombre de la columm buscada
    */ 
    find_columm: function (name_table, columm_table_id){
        let file_string= this.read_json(name_table)
        return file_string.filter( element => Object.values(element)[0] == columm_table_id);
    },

    string_order: function(object_add, file) {
        for (let i= 0; i < file.length; i++) {
            if (parseInt(Object.values(object_add)[0]) < parseInt(Object.values(file[i])[0])) {
                guardo_objeto = file[i];
                file[i]= object_add;
                object_add = guardo_objeto;
            }
        }
        file.push(object_add);
        return file;
    }
};


module.exports= engine