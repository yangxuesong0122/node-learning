/**
 * router.js 路由模块
 * 职责：
 *   处理路由
 *   根据不同的请求方法+请求路径设置具体的请求处理函数
 */

let fs = require('fs')
let Student = require('./student')

// Express 提供了一种专门用来包装路由的方法
let express = require('express')

// 1. 创建一个路由容器
let router = express.Router()

// 2. 把路由都挂载到 router 路由容器中
/*
 * 渲染学生列表页面（首页）
 */
router.get('/students', function (req, res) {
  // 第二个可选参数utf8就是把读取到的文件直接按照utf8编码转成我们能认识的字符，也可以通过data.toString()来转换
  // fs.readFile('./db.json', 'utf8', (err, data) => {
  //   if (err) {
  //     return res.status(500).send('server error.')
  //   }
  //   res.render('index.html', {
  //     fruits: ['苹果', '香蕉', '橘子'],
  //     students: JSON.parse(data).students
  //   })
  // })
  Student.find(function (err, data) {
    if (err) {
      return res.status(500).send('server error.')
    }
    res.render('index.html', {
      fruits: ['苹果', '香蕉', '橘子'],
      students: data
    })
  })
})

/*
 * 渲染添加学生页面
 */
router.get('/students/new', function (req, res) {
  res.render('new.html')
})

/*
 * 处理添加学生
 */
router.post('/students/new', function (req, res) {
  Student.save(req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
})

/*
 * 渲染编辑学生页面
 */
router.get('/students/edit', function (req, res) {
  Student.findById(parseInt(req.query.id), function (err, student) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('edit.html', {
      student
    })
  })
})

/*
 * 处理编辑学生
 */
router.post('/students/edit', function (req, res) {
  Student.updateById(req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
})

/*
 * 处理删除学生
 */
router.get('/students/delete', function (req, res) {
  Student.deleteById(req.query.id, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
})

// 3. 把 router 导出
module.exports = router

// module.exports = function (app) {
//   app.get('/students', function (req, res) {
//     // readFile 的第二个参数是可选的，传入 utf8 就是告诉它把读取到的文件直接按照 utf8 编码转成我们能认识的字符
//     // 除了这样来转换之外，也可以通过 data.toString() 的方式
//     fs.readFile('./db.json', 'utf8', function (err, data) {
//       if (err) {
//         return res.status(500).send('Server error.')
//       }
//       let students = JSON.parse(data).students
//       res.render('index.html', {
//         fruits: [
//           '苹果',
//           '香蕉',
//           '橘子'
//         ],
//         students: students
//       })
//     })
//   })
