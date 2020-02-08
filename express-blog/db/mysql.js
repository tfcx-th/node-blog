const mysql = require('mysql')
const { MYSQL_CONF } = require('./mysql.config')

const connection = mysql.createConnection(MYSQL_CONF)

connection.connect()

function exec(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

module.exports = {
    exec,
    escape: mysql.escape
}
