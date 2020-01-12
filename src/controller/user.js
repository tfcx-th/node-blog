const { exec } = require("../db/mysql")

const login = (username, password) => {
    let sql = `SELECT user_name, user_real_name 
               FROM user_info
               WHERE user_name='${username}' AND user_password='${password}'`
    return exec(sql).then(rows => rows[0] || {})
}

module.exports = {
    login
}
