let express = require('express')
let path = require('path')
let app = express()

// app.use('/public/', express.static('./public/'))
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.get('/', (req, res) => {
  res.send('收到请求。。。')
})
app.listen(3000, () => {
    console.log('服务器已经启动.....')
})