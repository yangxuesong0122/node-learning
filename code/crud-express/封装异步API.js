// function fn(callback) {
//   // let callback = function (data) { console.log(data) }

//   // setTimeout(function () {
//   //   let data = 'hello'
//   //   return data
//   // }, 1000)

//   // let data = '默认数据' 
//   // setTimeout(function () {
//   //   data = 'hello'
//   // }, 1000)
//   // return data

//   setTimeout(function () {
//     let data = 'hello'
//     callback(data)
//   }, 1000)
// }

// // 调用 fn ，得到内部的 data
// // console.log(fn())

// // 如果需要获取一个函数中异步操作的结果，则必须通过回调函数来获取
// fn(function (data) {
//   console.log(data)
// })


function fn(callback) {
  // let callback = function (data) { console.log(data) }

  setTimeout(function () {
    let data = 'hello'
    callback(data)
  }, 1000)
}

// 如果需要获取一个函数中异步操作的结果，则必须通过回调函数来获取
fn(function (data) {
  console.log(data)
})

