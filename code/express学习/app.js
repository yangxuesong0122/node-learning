let express = require('express')

// 创建服务器应用程序,也就是原来的 http.createServer
let app = express()


// 在 Express 中开放资源用一个 API 就可以公开指定目录，然后可以直接通过 /public/xx 的方式访问 public 目录中的所有资源了
// 推荐这种方式
app.use('/public/', express.static('./public/'))
// 当省略第一个参数的时候，则可以通过 省略 /public 的方式来访问,这种方式的好处就是可以省略 /public/
// app.use(express.static('./public/'))
app.use('/static/', express.static('./static/'))
app.use('/node_modules/', express.static('./node_modules/'))

// 必须是 /abc/d/puiblic目录中的资源具体路径,相当于给public起了个别名/abc/d       访问的时候，直接 http://127.0.0.1:3000/abc/d/js/main.js
// app.use('/abc/d/', express.static('./public/'))


app.get('/about', function (req, res) {
  // 在 Express 中可以直接 req.query 来获取查询字符串参数
  console.log(req.query)
  res.send('你好，我是 Express!')
})

// 当服务器收到 get 请求 / 的时候，执行回调处理函数
// app.get('/', function (req, res) {
//   res.send(`
// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <title>Document</title>
//   </head>
// <body>
//   <h1>hello Express！你好</h1>
// </body>
// </html>
// `)
// })

// 相当于 server.listen
app.listen(3000, function () {
  console.log('app is running at port 3000.')
})
