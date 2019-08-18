var mysql = require('mysql');

class Connector {

    constructor() {
        this.con = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_SCHEMA,
            port: '3306'
        });

        this.con.connect(function (err) {
            if (err) throw err;
        });
    }

}

module.exports = Connector;

