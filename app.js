const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// session
const SESSION_DATA = {}

const ONE_DAY_MILLSECONDS = 24 * 60 * 60 * 1000

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + ONE_DAY_MILLSECONDS)
    return d.toGMTString()
}

// handle post data
const getPostData = req => {
    return new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
}

const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')

    const url = req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])

    // handle cookies
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) return
        [ key, val ] = item.split('=')
        req.cookie[key.trim()] = val.trim()
    })

    // handle session
    let needSetCookie = false
    let userId = req.cookie.userid
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    } else {
        needSetCookie = true
        userId = `${ Date.now() }_${ Math.random() }`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]

    getPostData(req).then(postData => {
        req.body = postData

        // handle blog routers
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(blogData))
            }).catch(err => console.error(err))
            return
        }

        // handle user routers
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(userData))
            }).catch(err => console.error(err))
            return
        }

        // not found, 404
        res.writeHead(404, { "Content-type": "text/plain" })
        res.write("404 Not Found\n")
        res.end()
    })
}

module.exports = serverHandle

// env: process.env.NODE_ENV
