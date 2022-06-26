const fs = require('fs');

const User = {
    file_name: 'data/users-prueba.json',
    //Trae el archivo JSON de users y lo pasa a objeto
    get_data: function () {
        return JSON.parse(fs.readFileSync(this.file_name, 'utf-8'));
    },
    //Trae el JSON, toma el ultimo user y retorna el id + 1 para generar un nuevo id
    generate_id: function () {
        let all_users = this.find_all();
        let last_user = all_users.pop();
        if (last_user) {
            return last_user.id + 1;
        }
        return 1;
    },
    // Ejecuta get_data que convierte el JSON en objeto
    find_all: function () {
        return this.get_data();
    },
    //Busca al user por medio del id
    find_by_pk: function (id) {
        let all_users = this.find_all();
        let user_found = all_users.find(one_user => one_user.id === id);
        return user_found;
    },
    //Busca al user por medio de un campo
    find_by_field: function (field, text) {
        let all_users = this.find_all();
        let user_found = all_users.find(one_user => one_user[field] === text);
        return user_found;
    },
    //Crea un user y genera el id. Reescribe el JSON con el nuevo user
    create: function (user_data) {
        let all_users = this.find_all();
        let new_user = {
            id: this.generate_id(),
            ...user_data
        }
        
        all_users.push(new_user);
        fs.writeFileSync(this.file_name, JSON.stringify(all_users, null, ' '));
        return new_user;
    },
    //Elimina un usuer filtrando por el id
    delete: function (id) {
        let all_users = this.find_all();
        let final_users = all_users.filter(one_user => one_user.id !== id);
        fs.writeFileSync(this.file_name, JSON.stringify(final_users, null, ' '));
        return true;
    }
}

module.exports = User;