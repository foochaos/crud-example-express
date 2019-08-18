require('dotenv').config(); // Requerindo as configurações do seu .env

/**
 *  Instanciando seus controllers nessa parte, neste exeplo estamos apenas utilizando apenas o UserController
 */
const UserController = require('./Controllers/UserController');
/*
*  Instancaindo o módulo do Node.Express
* */
const path = require('path');
const express = require('express');
const app = express();


var App = function () {

    /**
     *  Fazendo o setup de algumas configurações do Express.Js
     *
     *   Iremos utilizar a template Engine do PUG, para mais informações sobre a Engine https://pugjs.org
     *
     *   Depois configuramos o diretório de Views
     *
     *  E configuramos o tipo de body requests com o qual iremos trabalhar, no nosso caso JSON;
     *     Para mais informações https://expressjs.com/en/4x/api.html#req.body;
     * */
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, '/Views'));
    app.use(express.json());


    app.get('/', (req, res) => {
        res.render('welcome');
    });

    /**
     *  Iremos trabalhar da seguinte forma nesse exemplo:
     *     . Nossa API irá seguir o seguinte padrão:
     *       - Para pegarmos todos os registros de um Model iremos utiliza-lo no plural;
     *       - Para inserir um registro no nosso banco de dados basta inserir ele como JSON no corpo da requisição POST
     *       - Para atualizar basta enviar o ID junto com o JSON no corpo da requisição POST
     *       - Para deletar basta fazer uma requisição DELETE, com o ID do registro que irá deletar:
     *          Ex: localhost:3000/user/4  --DELETE
     *       - Para resgatar um registro basta fazer uma requisição GET com o ID do registro:
     *          Ex: localhost:3000/user/4  --GET
     * */

    app.get('/users', (req, res) => {
        res.header('Content-Type', 'application/json');
        UserController.getAllUsers(function (e) {
            res.json(e);
        });
    });

    app.get('/user/:userId', (req, res) => {
        res.header('Content-Type', 'application/json');
        UserController.getUser(req.params.userId, function (e) {
            res.json(e);
        });
    });

    app.post('/user', (req, res) => {
        res.header('Content-Type', 'application/json');
        UserController.saveUser(req.body, function (e) {
            res.json(e);
        });
    });

    app.delete('/user/:id', (req, res) => {
        res.header('Content-Type', 'application/json');
        UserController.deleteUser(req.params.id, function (e) {
            res.json(e);
        });
    });

    app.listen(process.env.APP_PORT, () => {
    });
};

module.exports = App;
