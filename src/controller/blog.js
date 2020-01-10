const getList = (author, keyword) => {
    // mock data
    return [
        {
            id: 1,
            title: 'title_a',
            content: 'content_a',
            create_time: 1577714271068,
            author: 'a'
        },
        {
            id: 2,
            title: 'title_b',
            content: 'content_b',
            create_time: 1577714271268,
            author: 'b'
        },
        {
            id: 3,
            title: 'title_c',
            content: 'content_c',
            create_time: 1577714771068,
            author: 'c'
        }
    ]
}

const getDetail = id => {
    // mock data
    return {
        id: 1,
        title: 'title_a',
        content: 'content_a',
        create_time: 1577714271068,
        author: 'a'
    }
}

// blogData = { title: '', content: '' }
const newBlog = (blogData = {}) => {
    console.log(blogData)
    // mock data
    return {
        id: 4
    }
}

const updateBlog = (id, blogData = {}) => {
    console.log(id, blogData)
    // mock data
    return false
}

const deleteBlog = id => {
    console.log(id)
    // mock data
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}
// ffakKJDA12412Hdsasd121FAS
