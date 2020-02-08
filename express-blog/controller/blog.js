const xss = require('xss')
const { exec } = require("../db/mysql")

const getList = (author, keyword) => {
    let sql = `SELECT * FROM blog_list WHERE 1=1 `
    if (author) {
        sql += `AND blog_author='${author}' `
    }
    if (keyword) {
        sql += `AND blog_title like '%${keyword}%' `
    }
    sql += 'ORDER BY create_time desc'
    return exec(sql)
}

const getDetail = id => {
    let sql = `SELECT * FROM blog_list WHERE blog_id=${id}`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

// blogData = { title: '', content: '' }
const newBlog = (blogData = {}) => {
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const author = blogData.author
    const createtime = Date.now()

    let sql = `INSERT INTO blog_list (blog_title, blog_content, create_time, blog_author)
        values ('${title}', '${content}', ${createtime}, '${author}')`

    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    const { title, content } = blogData

    let sql = `UPDATE blog_list SET blog_title='${title}', blog_content='${content}' WHERE blog_id=${id}`

    return exec(sql).then(updateData => {
        return !!updateData.affectedRows
    })
}

const deleteBlog = (id, author) => {
    let sql = `DELETE FROM blog_list WHERE blog_id=${id} AND blog_author='${author}'`
    return exec(sql).then(deleteData => {
        return !!deleteData.affectedRows
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}
