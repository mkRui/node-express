# express-node
> node express 后端应用 为 blog 前台 后台 做接口服务

# 执行任务
这个express已经开发完成好几个月了经过一段时间还是有一些问题，于是乎打算把此项目重构一遍，然后此分支会根据重构进度来修改问题，而且也想把ts用到我的项目中 借此学习巩固自己的知识。

# 执行内容（任务）
> 若要查看新分支进程 请查看新的分支 node-nest `https://github.com/CoderRui/node-express/tree/node-nest`
1. 采用nest来重构本项目
2. 修改master分支上的问题，并同时开发新功能
3. 修改部分数据库字段
4. 重新设计评论接口以及功能
5. 主分支 代码以及结构 进行优化


# 基本插件 
1.express 脚手架

2.orm Sequelize

3.mySql 数据库

4.nodemailer 发送邮件


# 启动方式
``` bash
# start
npm run dev
# 开发环境
# script 使用了 supervisor 保持应用热更新

npm run start
# 生产环境
```
使用了 cross-env 插件 兼容平台式 环境配置 

# 基本功能
为前后台做数据接口服务

1.评论 使用 nodemailer 给评论人 或者 发布人 发送邮件

2.本后端服务 使用了 mvc 式的分层方式

# 计划
1.优化 评论功能 

2.数据字典管理 待优化 

3.代码格式 需要优化