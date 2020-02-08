const env = process.env.NODE_ENV

let REDIS_CONF

if (env === 'dev') {
    REDIS_CONF = {
        host: '127.0.0.1',
        port: '6379'
    }
}

if (env === 'production') {
    REDIS_CONF = {
        host: '127.0.0.1',
        port: '6379'
    }
}

module.exports = {
    REDIS_CONF
}
