const Model = require('../../vendor/Helpers/Model');

class User extends Model{

    /*
    *   Os Model's são Modelos de Objetos que nessa camada recebemos as Notificações do Controller
    *   para mudarmos o Estado da Aplicação, nesse exemplo estamos fazendo um CRUD
    *   e seus estados são C - Create, R - Read, U - Update e D - Delete.
    *   Quando um Controller muda o estado da Aplicação algo não está certo com a sua arquitetura uma vez
    *   que essa função é dada aos Model's
    * */
    constructor() {
        super('users');
        this.hidden = ['password'];
    }
}
module.exports = User;
