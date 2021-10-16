let express = require('express')
let dayjs = require('dayjs')
let bodyParser = require('body-parser')

let app = express()

// 文件路径，也可以省略./,写成 app.use('/public/', express.static('public'))
app.use('/public/', express.static('./public/'))

// 配置使用 art-template 模板引擎
  // app.engine('art', require('express-art-template'));
  // 第一个参数表示，当渲染以 .art 结尾的文件的时候，使用 art-template 模板引擎，express-art-template 是专门用来在 Express 中把 art-template 整合到 Express 中，express-art-template 依赖了 art-template
app.engine('html', require('express-art-template'))

// Express 为 Response 响应对象提供了一个方法：render，render 方法默认是不可以使用，但是如果配置了模板引擎就可以使用了
  // res.render('html模板名', {模板数据})
    // 第一个参数不能写路径，默认会去项目中的 views 目录查找该模板文件，Express 有一个约定：开发人员把所有的视图文件都放到 views 目录中
    // 如果想要修改默认的 views 目录，则可以 app.set('views', render函数的默认路径（目录路径）)

// 配置 body-parser 中间件（插件，专门用来解析表单 POST 请求体）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

let comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2021-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2021-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2021-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2021-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2021-10-16'
  }
]

app.get('/', function (req, res) {
  res.render('index.html', {
    comments: comments
  })
})

app.get('/post', function (req, res) {
  res.render('post.html')
})

// 当以 POST 请求 /post 的时候，执行指定的处理函数
app.post('/post', function (req, res) {
  // req.query 只能拿 get 请求参数
  // console.log(req.query)
  // 在express中没有内置获取表单post请求体的api，这里我们需要使用第三方包 body-parser
  console.log(req.body)
  let comment = req.body
  comment.dateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  comments.unshift(comment)

  // res.send
  // res.redirect
  // 这些方法 Express 会自动结束响应
  res.redirect('/')
  // res.statusCode = 302
  // res.setHeader('Location', '/') 
})

// app.get('/pinglun', function (req, res) {
//   let comment = req.query
//   comment.dateTime = '2021-10-16 10:58:51'
//   comments.unshift(comment)
//   res.redirect('/')
//   // res.statusCode = 302
//   // res.setHeader('Location', '/')
// })

app.listen(3000, function () {
  console.log('running...')
})
