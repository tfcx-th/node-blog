const { SuccessModel, ErrorModel } = require('../model/resModel')
const { login } = require('../controller/user')
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
    const method = req.method

    // login
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        return login(username, password).then(data => {
            if (data.user_name) {
                // set session
                req.session.username = data.user_name
                req.session.realName = data.user_real_name
                // 同步到redis
                set(req.sessionId, req.session)
                return new SuccessModel()
            }
            return new ErrorModel('login failed')
        })
    }
}

module.exports = handleUserRouter
