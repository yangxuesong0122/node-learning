let express = require('express')
let path = require('path')
let router = require('./router')
let bodyParser = require('body-parser')
let session = require('express-session')
let app = express()

// app.use('/public/', express.static('./public/'))
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.engine('html', require('express-art-template'))
app.set('artTemplate模板继承和子模版', path.join(__dirname, './artTemplate模板继承和子模版/')) // 默认就是 ./artTemplate模板继承和子模版 目录

// 配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前 ）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 把路由挂载到app中
app.use(router)
app.listen(3000, () => {
    console.log('服务器已经启动.....')
})