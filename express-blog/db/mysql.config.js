const env = process.env.NODE_ENV

let MYSQL_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'tong0510',
        port: '3306',
        database: 'node_blog'
    }
}

if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'tong0510',
        port: '3306',
        database: 'node_blog'
    }
}

module.exports = {
    MYSQL_CONF
}
