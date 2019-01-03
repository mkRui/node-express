# express-node
> node express 后端应用
> 
为 blog 前台 后台 做接口服务 


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