let http = require('http')

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
    if (req.url === '/') {
        res.end('首页')
    } else if (req.url === '/login') {
        res.end('登录')
    } else if (req.url === '/register') {
        res.end('注册')
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