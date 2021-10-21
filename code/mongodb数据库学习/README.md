- 基本命令
    + show dbs    查看显示所有数据库
    + `use 数据库名称` 切换到指定的数据库，如果没有会新建
    + db 查看当前操作的数据库
    + db.students.insertOne({"name":"yxs"})    插入数据
    + show collection   显示所有集合
    + db.students.find()  查看集合数据
- 在node中如何操作mongodb数据库
    + 使用官方的 mongodb 包来操作
    + 使用第三方 mongoose 来操作
      * 基于官方的mongodb包再一次做了封装
      * 网址：mongoosejs.com
- mongodb数据库基本概念
    + 可以有多个数据库
    + 一个数据库中可以有多个集合（表）
    + 一个集合中可以有多个文档（表记录）
    + 文档结构很灵活，没有任何限制
    + 