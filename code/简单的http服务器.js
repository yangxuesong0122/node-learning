let http = require('http')

let server = http.createServer()
server.on('request', function () {
    // 注册request请求事件，客户端请求过来会自动触发服务器的request请求事件
    console.log('收到请求了')
})
// 启动服务器
server.listen(3000, function () {
    console.log('服务器启动成功')
})