let http = require('http')
let fs = require('fs')
let template = require('art-template')


let server = http.createServer()

let wwwDir = 'C:/app/www'

server.on('request', function (req, res) {
    let url = req.url
    fs.readFile('./template.html', function (err, data) {
        if (err) {
            return res.end('404 Not Found.')
        }

        fs.readdir(wwwDir, function (err, files) {
            if (err) {
                return res.end('Can not find www dir.')
            }

            let htmlStr = template.render(data.toString(), {
                files
            })

            // 3. 发送解析替换过后的响应数据
            res.end(htmlStr)
        })
    })
})
server.listen(3000, function () {
    console.log('running...')
})
