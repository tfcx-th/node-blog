const xss = require('xss')
const { exec } = require("../db/mysql")

const getList = async (author, keyword) => {
    let sql = `SELECT * FROM blog_list WHERE 1=1 `
    if (author) {
        sql += `AND blog_author='${author}' `
    }
    if (keyword) {
        sql += `AND blog_title like '%${keyword}%' `
    }
    sql += 'ORDER BY create_time desc'
    return await exec(sql)
}

const getDetail = async id => {
    const sql = `SELECT * FROM blog_list WHERE blog_id=${id}`
    const rows = await exec(sql)
    return rows[0]
}

// blogData = { title: '', content: '' }
const newBlog = async (blogData = {}) => {
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const author = blogData.author
    const createtime = Date.now()
    const sql = `INSERT INTO blog_list (blog_title, blog_content, create_time, blog_author)
        values ('${title}', '${content}', ${createtime}, '${author}')`
    const insertData = await exec(sql)
    return {
        id: insertData
    }
}

const updateBlog = async (id, blogData = {}) => {
    const { title, content } = blogData
    const sql = `UPDATE blog_list SET blog_title='${title}', blog_content='${content}' WHERE blog_id=${id}`
    const updateData = await exec(sql)
    return !!updateData.affectedRows
}

const deleteBlog = async (id, author) => {
    const sql = `DELETE FROM blog_list WHERE blog_id=${id} AND blog_author='${author}'`
    const deleteData = await exec(sql)
    return !!deleteData.affectedRows
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}
