/**
 * 
 * @class user 人员的操作
 * 
 * @static user
 * 
 */

const userModel = require('./../../model/user/index.model')

const dataModel = require('./../../config/index').DATA

const md5 = require('md5-node')

class user {

  /**
   * 初始化
   * @class initPage
   * 
   * @static initPage 用户信息初始化
   */
  static initPage (req, res, next) {
    if (req.session.init) {
      res.send(dataModel(-1, '' , req.session.init))
    } else {
      res.send(dataModel(-1, '您还没有登录 请先登录', {}))
    }
  }

  /**
   * 注册
   * @class addUser
   * 
   * @static addUser 注册用户信息
   * 
   * @param {userName} 用户名
   * 
   * @param {passWord} 密码
   * 
   * @param {nickName} 昵称
   * 
   * @param {email} 邮箱
   * 
   */
  static addUser (req, res, next) {
    let {userName, passWord, nickName, email} = req.body
    // md5 加密
    if (req.body.passWord) {
      passWord = md5(req.body.passWord)
    }
    // 查找昵称是否占用
    userModel.selectNickName(nickName).then((data) => {
      if (!data.length) {
        return userModel.addUser(userName, passWord, nickName, email)
      } else {
        res.send(dataModel(1, '昵称已占用', {}))
      }
    }).then((data) => {
      if (data) {
        res.send(dataModel(1, '恭喜~注册成功', {}))
      }
    }).catch((res) => {
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }

  /**
   * 
   * 登录
   * @class login
   * 
   * @static login
   * 
   * @param {nickName} 昵称
   * 
   * @param {passWord} 密码
   */
  static login (req, res, next) {
    let { nickName, passWord } = req.body
    if (passWord) {
      passWord = md5(req.body.passWord)
    }
    userModel.selectUser(nickName, passWord).then((data) => {
      if (data[0]) {
        let { id, nickName, createTime, userFace, user_role, userState } = data[0]
        req.session.init = {
          id: id,
          nickName: nickName,
          createTime: createTime,
          userFace: userFace,
          userState: userState,
          userRole: user_role
        }
        res.send(dataModel(1, '登录成功', {}))
      } else {
        res.send(dataModel(1, '该用户不存在', {}))
      }
    }).catch((data) => {
      console.log(data)
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }

  /**
   * 修改人员状态
   * @class updateState
   * 
   * @static updateState
   * 
   * @param {id} 人员id
   */
  
   static updateState (req, res, next) {
    let { id, state } = req.body
    userModel.updateUserState(id, state).then((data) => {
      return userModel.selectAllUser()
    }).then((data) => {
      res.send(data)
    })
   }

   /**
    * 修改人员信息
    * 
    * @class updateInfo
    * 
    * @static updateInfo
    * 
    * @param {id} 人员id
    * 
    * @param {nickName} 人员昵称
    * 
    * @param {email} 人员邮箱
    * 
    * @param {UserRoleId} 人员角色
    * 
    */

    static updateInfo (req, res, next) {
      let {id, nickName, email, UserRoleId} = req.body
      userModel.updateUserInfo(id, nickName, email, UserRoleId).then((data) => {
        return userModel.selectAllUser()
      }).then((data) => {
        res.send(data)
      })
    }
}

module.exports = user