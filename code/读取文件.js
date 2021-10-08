// 浏览器中的 JavaScript 是没有文件操作的能力的
// 但是 Node 中的 JavaScript 具有文件操作的能力

// fs 是 file-system 的简写，就是文件系统的意思
// 在 Node 中如果想要进行文件操作，就必须引入 fs 这个核心模块
// 在 fs 这个核心模块中，就提供了所有的文件操作相关的 API
// 例如：fs.readFile 就是用来读取文件的

// 1. 使用 require 方法加载 fs 核心模块
var fs = require('fs')

// 2. 读取文件
//    第一个参数就是要读取的文件路径
//    第二个参数是一个回调函数
//        成功
//          data 数据
//          error null
//        失败
//          data undefined没有数据
//          error 错误对象
fs.readFile('./data/hello.txt', function (error, data) {
    // <Buffer 68 65 6c 6c 6f 20 6e 6f 64 65 6a 73 0d 0a>
    // 文件中存储的其实都是二进制数据 0 1，上述情况是因为二进制转为 16 进制了，但是无论是二进制01还是16进制，可以通过 toString 方法把其转为我们能认识的字符
    // 在这里就可以通过判断 error 来确认是否有错误发生
    if (error) {
        console.log('读取文件失败了')
    } else {
        console.log(data.toString())
    }
})