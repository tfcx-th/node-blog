const { SuccessModel, ErrorModel } = require('../model/resModel')
const { login } = require('../controller/user')

const handleUserRouter = (req, res) => {
    const method = req.method

    // login
    if (method === 'GET' && req.path === '/api/user/login') {
        // const { username, password } = req.body
        const { username, password } = req.query
        return login(username, password).then(data => {
            if (data.user_name) {
                // set session
                req.session.username = data.user_name
                req.session.realName = data.user_real_name
                return new SuccessModel()
            }
            return new ErrorModel('login failed')
        })
    }

    // login check
    if (method === 'GET' && req.path === '/api/user/logintest') {
        return Promise.resolve( req.session.username ? new SuccessModel({
            session: req.session
        }) : new ErrorModel('login failed'))
    }
}

module.exports = handleUserRouter
