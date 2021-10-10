let http = require('http')
let fs = require('fs')

let server = http.createServer()

let wwwDir = 'C:/app/www'

server.on('request', function (req, res) {
    let url = req.url
    let filePath = '/index.html'
    if (url !== '/') {
        filePath = url
    }

    fs.readFile(wwwDir + filePath, function (err, data) {
        if (err) {
            return res.end('404 Not Found.')
        }
        res.end(data)
    })
})

// 3. 绑定端口号，启动服务
server.listen(3000, function () {
    console.log('running...')
})
