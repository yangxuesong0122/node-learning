// 约定把所有的静态资源都存放在 public 目录中

let http = require('http')
let fs = require('fs')
let url = require('url')
let dayjs = require('dayjs')

let template = require('art-template')

let comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2021-10-10'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2021-10-10'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2021-10-10'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2021-10-10'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2021-10-10'
  }
]

http.createServer(function (req, res) { // 简写方式，该函数会直接被注册为 server 的 request 请求事件处理函数
    // 使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
    let parseObj = url.parse(req.url, true)

    // 单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）
    let pathname = parseObj.pathname

    if (pathname === '/') {
      fs.readFile('./views/index.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        let htmlStr = template.render(data.toString(), {
          comments
        })
        res.end(htmlStr)
      })
    } else if (pathname === '/post') {
      fs.readFile('./views/post.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    } else if (pathname.indexOf('/public/') === 0) {
      // 统一处理：如果请求路径是以 /public/ 开头的，则是要获取 public 中的某个资源, 所以就直接可以把请求路径当作文件路径来直接进行读取
      fs.readFile('.' + pathname, function (err, data) {
        if (err) {
          return res.end('404 Not Found.!!!!!!!!')
        }
        res.end(data)
      })
    } else if (pathname === '/pinglun') {
      let comment = parseObj.query
      comment.dateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
      comments.unshift(comment)
      // 服务端这个时候已经把数据存储好了，接下来就是让用户重新请求 / 首页，就可以看到最新的留言内容了
      // 如何通过服务器让客户端重定向？
      //    1. 状态码设置为 302 临时重定向
      //        statusCode
      //    2. 在响应头中通过 Location 告诉客户端往哪儿重定向
      //        setHeader
      // 如果客户端发现收到服务器的响应的状态码是 302 就会自动去响应头中找 Location ，然后对该地址发起新的请求
      // 所以能看到客户端自动跳转了
      res.statusCode = 302
      res.setHeader('Location', '/')
      res.end()
      // fs.readFile('./views/index.html', function (err, data) {
      //   if (err) {
      //     return res.end('404 Not Found.')
      //   }
      //   let htmlStr = template.render(data.toString(), {
      //     comments
      //   })
      //   res.end(htmlStr)
      // })
    } else {
      fs.readFile('./views/404.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    }
  })
  .listen(3000, function () {
    console.log('running...')
  })

// Node 不适合从来没有接触过服务端的人学习
// 如果想要真正的学号服务端，还是老牌的 Java、PHP 这些平台
// Node 不是特别适合入门服务端，但不代表 Node 不强大
// Node 很厉害，具有经验的人可以玩儿的非常的牛
// 不适合新手的原因就在于比较偏底层、而且太灵活
// Java、PHP 好入门的原因就在于：这些平台屏蔽了一些底层
// res.redirect('重定向')


// 晚上写案例照着下面的步骤写：
// 1. / index.html
// 2. 开放 public 目录中的静态资源
//    当请求 /public/xxx 的时候，读取响应 public 目录中的具体资源
// 3. /post post.html
// 4. /pinglun
//    4.1 接收表单提交数据
//    4.2 存储表单提交的数据
//    4.3 让表单重定向到 /
//        statusCode
//        setHeader

// 明天：
// 模块系统
// Express（第三方 Web 开发框架）
//    这两做的事儿，在框架里面就是一个 API 的事儿
//    使用框架的目的就是让我们更加专注于业务，而不是底层细节
