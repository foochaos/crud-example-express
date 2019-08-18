const Connector = require('../Databse/Connector');

class Model extends Connector {

    /*
    *  Nesta classe estamos fazendo alguns conceitos básicos de ORM, BuildQuery
    *  não estamos seguindo o Conceito do SOLID nessa versão do projeto,
    *  fique a vontade para ler o código e etc...
    * */
    constructor(table) {
        super();
        this.table = table;
        this.primaryKey = 'id';
        this.hidden = [];
    }

    all(callback) {
        let toReturn = [], hidden = this.hidden;
        this.con.query(`SELECT * FROM ${this.table}`, function (err, result) {
            if (err) throw err;
            result.map(function (value, key) {
                let obj = {};
                for (let i in value) {
                    let verify = hidden.find(function (e) {
                        return e === i;
                    });
                    if (!verify) obj[i] = value[i];
                }
                toReturn.push(obj);
            });
            callback(toReturn);
        });
    }

    save(obj, callback) {

        this.con.query(this.buildSaveQuery(obj), function (err, result) {
            if (err) throw err;
            callback(true);
        });
    }

    delete(id, callback) {
        this.con.query(`delete from users where ${this.primaryKey} = ${id}`, function (err, result) {
            if (err) throw err;
            callback(true);
        });
    }

    find(id, callback) {
        let toReturn = {}, hidden = this.hidden;
        this.con.query(`SELECT * FROM ${this.table} WHERE ${this.primaryKey} = ${id}`, function (err, result) {
            if (err) throw err;
            for (let i in result[0]) {
                let verify = hidden.find(function (e) {
                    return e === i;
                });
                if (!verify) toReturn[i] = result[0][i];
            }
            callback(toReturn);
        });
    }

    buildSaveQuery(obj) {
        if (obj.id) {
            let fields = ``, primaryKey;
            for (let i in obj) {
                if (i === this.primaryKey) {
                    primaryKey = i;
                } else {
                    fields += `${i} = '${obj[i]}',`;
                }
            }
            return `update ${this.table} SET ${fields.substring(0, fields.length - 1)} WHERE ${primaryKey} = ${obj.id}`;
        } else {
            let fields = '', values = '';
            for (let i in obj) {
                fields += `${i},`;
                values += `'${obj[i]}',`;
            }
            return `INSERT INTO ${this.table} (${fields.substring(0, fields.length - 1)}) VALUES (${values.substring(0, values.length - 1)})`;
        }
    }
}

module.exports = Model;
