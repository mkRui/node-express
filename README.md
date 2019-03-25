# node-nest

> `NestJs` 是基于 `express` 和 `scoket.io` 构建而主分支 [master](https://github.com/CoderRui/node-express/tree/node-nest) 则是主要使用 express 进行构建，`NestJs`采用 `js` 构建 `ts` 编码，所以采用 `NestJs` 已经成为了我的不二之选。  

数据库还是采用`mysql` 依旧采用 `orm/TypeORM` 并且同样采用`MVC`分层，初始的就先计划这么多 

```bash
1. 克隆项目。。。  

# 下载依赖
2.npm i or cnpm i  

# 启动项目
3.npm run start or npm run start:hmr

# start:hmr 为重载开发模式 
# 首先需要 启动窗口 执行 npm run webpack 
# 再重新打开一个窗口 执行 npm run start:hmr
# 注意！！！！ 启动热重载开发模式 需要事先执行 cnpm i supervisor -g 
# supervisor 已经下载过的就不用再下载

# 访问地址 http://localhost:3000
```
# 更新日志
### 2019-03
- 2019-03-25
    - 配置webpack热重载
- 2019-03-24
    - 初步构建项目
