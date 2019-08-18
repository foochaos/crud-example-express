const User = require('../Model/User');

class UserController {

    /*
    *   Toda requisição HTTP deve passar por um Controller,
    *   o Controller irá notificar a Camada de Models qual será a modificação no Estado da Aplicação será feita.
    *   Ele irá controlar todas as ações da sua aplicação, porém ele não mudará o estado dela, esse papel se da a camada dos Models.
    * */

    constructor() {
    }

    static getAllUsers(callback) {
        new User().all(function (e) {
            callback(e);
        });
    }

    static getUser(id, callback) {
        new User().find(id, function (e) {
            callback(e);
        });
    }

    static saveUser(obj, callback) {
        new User().save(obj, function (e) {
            callback(e);
        })
    }

    static deleteUser(id, callback) {
        console.log('deleteUser');
        new User().delete(id, function (e) {
            callback(e);
        })
    }
}

module.exports = UserController;
