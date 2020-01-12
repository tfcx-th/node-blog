const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')

const handleBlogRouter = (req, res) => {
    const method = req.method

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
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
        // TODO: mock data
        req.body.author = 'tfcx'
        return newBlog(req.body).then(data => {
            return new SuccessModel(data)
        })
    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const id = req.query.id
        return updateBlog(id, req.body).then(result => {
            return result ? new SuccessModel() : new ErrorModel('update failed')
        })
    }

    // 删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        // TODO: mock data
        const author = 'tfcx'
        const id = req.query.id
        return deleteBlog(id, author).then(result => {
            return result ? new SuccessModel() : new ErrorModel('update failed')
        })
    }
}

module.exports = handleBlogRouter
