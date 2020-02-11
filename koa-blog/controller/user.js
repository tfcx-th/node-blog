const { exec, escape } = require("../db/mysql")
const { genPassword } = require("../utils/cryp")

const login = async (username, password) => {
    username = escape(username)
    // 生成加密密码
    password = escape(genPassword(password))
    const sql = `SELECT user_name, user_real_name 
               FROM user_info
               WHERE user_name=${username} AND user_password=${password}`
    const rows = await exec(sql)
    return rows[0] || {}
}

module.exports = {
    login
}
