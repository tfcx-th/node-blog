const { SuccessModel, ErrorModel } = require('../model/resModel')
const { loginCheck } = require('../controller/user')

const handleUserRouter = (req, res) => {
    const method = req.method

    // login
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        return loginCheck(username, password) ? new SuccessModel() : new ErrorModel('login failed')
    }
}

module.exports = handleUserRouter
