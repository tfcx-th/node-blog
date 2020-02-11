const router = require('koa-router')()
const loginCheck = require('../middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
    let author = ctx.query.author || ''
    const keyword = ctx.query.keyword || ''
    if (!ctx.session.username) {
        // 未登录
        ctx.body = new ErrorModel('未登录')
        return
    }
    author = ctx.session.username;
    const listData = await getList(author, keyword)
    ctx.body = new SuccessModel(listData)
})

router.get('/detail', async (ctx, next) => {
    const detailData = await getDetail(ctx.query.id)
    ctx.body = new SuccessModel(detailData)
})

router.post('/new', loginCheck, async (ctx, next) => {
    ctx.request.body.author = ctx.session.username
    const newData = await newBlog(ctx.request.body)
    ctx.body = new SuccessModel(newData)
})

router.post('/update', loginCheck, async (ctx, next) => {
    const updateData = await updateBlog(ctx.query.id, ctx.request.body)
    if (updateData) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('update failed')
    }
})

router.post('/del', loginCheck, async (ctx, next) => {
    const author = ctx.session.username
    const id = ctx.query.id
    const deleteData = await deleteBlog(id, author)
    if (deleteData) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('delete failed')
    }
});

module.exports = router