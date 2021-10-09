console.log('b start')

// 由于模块作用域（文件作用域）的原因，b模块不能调用a模块的add方法
// console.log(add(10, 20))

// a模块中也定义了foo变量，b模块中的foo变量不会覆盖a模块中定义的变量
var foo = 'bbb'

require('./c.js')
console.log('b end')