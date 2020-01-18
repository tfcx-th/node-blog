const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')

// 登录验证
const loginCheck = req => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('not login'))
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // 管理员界面
        if (req.query.isAdmin) {
            const loginCheckResult = loginCheck(req)
            if (loginCheckResult) {
                // 未登录
                return loginCheckResult
            }
            author = req.session.username
        }
        return getList(author, keyword).then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id
        return getDetail(id).then(detailData => {
            return new SuccessModel((detailData))
        })
    }

    // 新建博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        if (loginCheck(req)) return loginCheck(req)
        req.body.author = req.session.username
        return newBlog(req.body).then(data => {
            return new SuccessModel(data)
        })
    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        if (loginCheck(req)) return loginCheck(req)
        const id = req.query.id
        return updateBlog(id, req.body).then(result => {
            return result ? new SuccessModel() : new ErrorModel('update failed')
        })
    }

    // 删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        if (loginCheck(req)) return loginCheck(req)
        const author = req.session.username
        const id = req.query.id
        return deleteBlog(id, author).then(result => {
            return result ? new SuccessModel() : new ErrorModel('update failed')
        })
    }
}

module.exports = handleBlogRouter
