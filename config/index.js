const Sequelize = require('sequelize');
const argv = require('yargs').alias('u', 'emailUser').alias('p', 'emailPass').argv;

exports.SEQUELIZE = new Sequelize('blog_control', 'root', 'varscr9931', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

/**
 * @class DATA 返回模版
 * 
 * @static DATA
 * 
 * @param {code} 状态码 1 成功 0 失败 -1 异常 -2 未登录 —3 无权限
 * 
 * @param {messgae} 返回的提示信息
 * 
 * @param {result} 返回的字段名称
 * 
 */

exports.DATA = (code, messgae, result) => {
  return {
    code: code,
    messgae: messgae,
    result: result
  }
}

exports.EMAIL = {
  emailUser: argv.emailUser,
  emailPass: argv.emailPass
}
