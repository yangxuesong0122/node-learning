let express = require('express')
let path = require('path')
let app = express()

// app.use('/public/', express.static('./public/'))
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/')) // 默认就是 ./views 目录

app.get('/', (req, res) => {
  res.render('index.html', {
      name: '杨雪松'
  })
})
app.listen(3000, () => {
    console.log('服务器已经启动.....')
})