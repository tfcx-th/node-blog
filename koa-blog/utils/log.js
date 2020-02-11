const fs = require('fs')
const path = require('path')

// 写 log
function writeLog(writeStream, log) {
    writeStream.write(log + '\n')
}

// 生成 write stream
function createWriteStream(fileName) {
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    return fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
}

// 写访问日志
const accessWriteStream = createWriteStream('access.log')
function access(log) {
    writeLog(accessWriteStream, log)
}

module.exports = {
    access
}
