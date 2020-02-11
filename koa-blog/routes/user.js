const router = require('koa-router')()
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { login } = require('../controller/user');

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
    const { username, password } = ctx.request.body
    const loginData = await login(username, password)
    if (loginData.user_name) {
        // set session
        ctx.session.username = loginData.user_name
        ctx.session.realName = loginData.user_real_name
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('login failed')
    }
})

router.get('/sessiontest', async (ctx, next) => {
    if (!ctx.session.viewCount) {
        ctx.session.viewCount = 0
    }
    ctx.session.viewCount++
    ctx.body = {
        errno: 0,
        viewCount: ctx.session.viewCount
    }
})

module.exports = router