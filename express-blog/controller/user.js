const { exec, escape } = require("../db/mysql")
const { genPassword } = require("../utils/cryp")

const login = (username, password) => {
    username = escape(username)
    // 生成加密密码
    password = genPassword(password)
    password = escape(password)

    let sql = `SELECT user_name, user_real_name 
               FROM user_info
               WHERE user_name=${username} AND user_password=${password}`
    return exec(sql).then(rows => rows[0] || {})
}

module.exports = {
    login
}
