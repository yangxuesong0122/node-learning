- path.join()
  + 可以帮助我们拼接路径,避免我们手动拼错
  + __dirname: 可以用来获取当前文件模块所属目录的绝对路径
  + __filename: 可以用来获取当前文件的绝对路径
  + fs.readFile('./a.txt')   **相对于执行node命令所处的终端路径，不是相对于当前文件的路径**
  + 在文件操作中使用相对路径是不可靠的，因为在node中文件操作的路径被设计为相对于执行node命令所处的路径，为了解决这个问题，只需要把相对路径变为绝对路径
    可以使用__dirname或者__filename来帮我们解决这个问题。为了避免拼接路径的错误，我们使用path.join()帮助我们拼接路径
- path.parse('c:/a/b/c.js)
  + { root: 'c:/', dir: 'c:/a/b', base: 'c.js', ext: '.js', name: 'c' }