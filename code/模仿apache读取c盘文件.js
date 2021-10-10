let http = require('http')
let fs = require('fs')

// 1. 创建 Server
let server = http.createServer()

// Apache 服务器软件默认有一个 www 目录，所有存放在 www 目录中的资源都可以通过网址来浏览
// 127.0.0.1:80/a.txt
// 127.0.0.1:80/index.html
// 127.0.0.1:80/apple/login.html

let wwwDir = 'C:\\app\\www'
// let wwwDir = 'C:/app/www'

server.on('request', function (req, res) {
    let url = req.url
    // / index.html
    // /a.txt wwwDir + /a.txt
    // /apple/login.html wwwDir + /apple/login.html
    if (url === '/') {
        fs.readFile(wwwDir + '/index.html', function (err, data) {
            if (err) {
                // return 有两个作用：
                //  1. 方法返回值
                //  2. 阻止代码继续往后执行
                return res.end('404 Not Found.')
            }
            res.end(data)
        })
    } else if (url === '/a.txt') {
        fs.readFile(wwwDir + '/a.txt', function (err, data) {
            if (err) {
                return res.end('404 Not Found.')
            }
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.end(data)
        })
    } else if (url === '/index.html') {
        fs.readFile(wwwDir + '/index.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found.')
            }
            res.end(data)
        })
    } else if (url === '/test/login.html') {
        fs.readFile(wwwDir + '/test/login.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found.')
            }
            res.end(data)
        })
    }
})

// 3. 绑定端口号，启动服务
server.listen(3000, function () {
    console.log('杨雪松的服务器启动了。。。')
})
