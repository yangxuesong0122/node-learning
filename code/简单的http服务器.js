let http = require('http')
var fs = require('fs')

let server = http.createServer()

// request 请求事件处理函数，需要接收两个参数：
//    Request 请求对象
//        请求对象可以用来获取客户端的一些请求信息，例如请求路径
//    Response 响应对象
//        响应对象可以用来给客户端发送响应消息
server.on('request', function (req, res) {
    // 注册request请求事件，客户端请求过来会自动触发服务器的request请求事件
    console.log('收到请求了,请求路径是' + req.url)

    // 响应内容只能是二进制数据或者字符串
    //  数字
    //  对象
    //  数组
    //  布尔值

    // 在服务端默认发送的数据，其实是 utf8 编码的内容
    // 但是浏览器不知道你是 utf8 编码的内容
    // 浏览器在不知道服务器响应内容的编码的情况下会按照当前操作系统的默认编码去解析
    // 中文操作系统默认是 gbk
    // 解决方法就是正确的告诉浏览器我给你发送的内容是什么编码的
    // 在 http 协议中，Content-Type 就是用来告知对方我给你发送的数据内容是什么类型
    // res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    // res.end('hello 世界')

    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    if (req.url === '/') {
        // res.end('首页')
        fs.readFile('./resource/index.html', function (err, data) {
            if (err) {
                res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                res.end('文件读取失败，请稍后重试！')
            } else {
                // data 默认是二进制数据，可以通过 .toString 转为能识别的字符串
                // res.end() 支持两种数据类型，一种是二进制，一种是字符串
                res.setHeader('Content-Type', 'text/html; charset=utf-8')
                res.end(data)
            }
        })
    } else if (req.url === '/login') {
        res.end('登录')
    } else if (req.url === '/register') {
        res.end('注册')
    } else if (req.url === '/html') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end('<p>hello html <a href="">点我</a></p>')
    } else if (req.url === '/ab') {
        fs.readFile('./resource/ab2.jpg', function (err, data) {
            if (err) {
                res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                res.end('文件读取失败，请稍后重试！')
            } else {
                // 图片不需要指定编码，因为常说的编码一般指的是：字符编码
                res.setHeader('Content-Type', 'image/jpeg')
                res.end(data)
            }
        })
    } else {
        res.end('页面不存在')
    }

    // response 对象有一个方法：write 可以用来给客户端发送响应数据
    // write 可以使用多次，但是最后一定要使用 end 来结束响应，否则客户端会一直等待
    // res.write('hello')
    // res.write(' nodejs')

    // 结束响应
    // res.end()
})
// 启动服务器
server.listen(3000, function () {
    console.log('服务器启动成功')
})