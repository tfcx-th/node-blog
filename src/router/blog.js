const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author, keyword)
        return new SuccessModel(listData)
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const detailData = getDetail(id)
        return new SuccessModel(detailData)
    }

    // 新建博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const blogData = newBlog(req.body)
        return new SuccessModel(blogData)
    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const updateReslut = updateBlog(id, req.body)
        return updateReslut ? new SuccessModel() : new ErrorModel('failed')
    }

    // 删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const deleteResult = deleteBlog(id)
        return deleteResult ? new SuccessModel() : new ErrorModel('failed')
    }
}

module.exports = handleBlogRouter
