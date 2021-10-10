let http = require('http')
let fs = require('fs')

let server = http.createServer()

let wwwDir = 'C:/app/www'

server.on('request', function (req, res) {
  let url = req.url
  fs.readFile('./template.html', function (err, data) {
    if (err) {
      return res.end('404 Not Found.')
    }
    // 1. 通过fs.readdir得到 wwwDir 目录列表中的文件名和目录名
    // 2. 将得到的文件名和目录名替换到 template.html 中
    //    2.1 在 template.html 中需要替换的位置预留一个特殊的标记
    //    2.2 根据 files 生成需要的 HTML 内容
    fs.readdir(wwwDir, function (err, files) {
      if (err) {
        return res.end('Can not find www dir.')
      }

      // 2.1 生成需要替换的内容
      let content = ''
      files.forEach(function (item) {
        content += `
          <tr>
            <td data-value="apple/"><a class="icon dir" href="/C:/app/www/">${item}/</a></td>
            <td class="detailsColumn" data-value="0"></td>
            <td class="detailsColumn" data-value="1509589967">2021/10/10 上午11:53</td>
          </tr>
        `
      })

      // 2.3 替换
      data = data.toString().replace('^_^', content)

      // 3. 发送解析替换过后的响应数据
      res.end(data)
    })
  })
})
server.listen(3000, function () {
  console.log('running...')
})
