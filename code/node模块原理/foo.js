// 在 Node 中，每个模块内部都有一个自己的 module 对象，该 module 对象中有一个成员叫：exports 也是一个对象
// 也就是说如果你需要对外导出成员，只需要把导出的成员挂载到 module.exports 中
// var module = {
//   exports: {
//     foo: 'bar',
//     add: function
//   }
// }

// 当一个模块需要导出单个成员的时候，直接给 exports 赋值是不管用的，因为最后 return 的是 module.exports，而不是 exports
// 由于每次导出接口成员的时候都通过 module.exports.xxx = xxx 的方式很麻烦，所以，Node 为了简化操作，提供了一个变量：exports 等于 module.exports，也就是说在模块中还有这么一句代码
   // var exports = module.exports

// console.log(exports === module.exports)  // true,两者一致，所以可以使用任意一方来导出内部成员


// 两者可以混搭，如下
// exports.foo = 'bar'
// module.exports.add = function (x, y) {
//   return x + y
// }
// 输出结果：{ foo: 'bar', add: [Function (anonymous)] }



// 给 exports 赋值会断开和 module.exports 之间的引用，同理，给 module.exports 重新赋值也会断开，导致exports !== module.exports
// exports.a = 123
// exports = {}
// exports.foo = 'bar'
// module.exports.b = 456
// 输出结果：{ a: 123, b: 456 }


// exports.a = 123
// module.exports = {
//   foo: 'bar'
// }
// module.exports.bar = 'bar'
// 输出结果：{ foo: 'bar', bar: 'bar' }



// 这里又重新建立两者的引用关系
// exports.a = 123
// module.exports = {
//   foo: 'foo'
// }
// exports = module.exports
// exports.hello = 'hello'
// 输出结果：{ foo: 'foo', hello: 'hello' }



// 真正去使用的时候：
//    导出多个成员：exports.xxx = xxx
//    导出多个成员也可以：module.exports = {
//                        }
//    导出单个成员：module.exports


// 谁来 require ，谁就得到 module.exports
// 默认在代码的最后有一句：
// 一定要记住，最后 return 的是 module.exports
// 不是 exports
// 所以给 exports 重新赋值不管用，
// return module.exports
