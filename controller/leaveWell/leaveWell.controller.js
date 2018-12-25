/**
 * @class leaveController
 * 
 * @static leaveController
 * 
 */

const leaveModel = require('./../../model/leaveWell/index.model')

const dataModel = require('./../../config/index').DATA

class leaveController {

  /**
   * @class allLeaveList
   * 
   * @static allLeaveList
   * 
   * @param {pageNo} 当前第几页
   * 
   * @param {pageSize} 每页有多少个
   */

  static allLeaveList (req, res, next) {
    let {pageNo, pageSize} = req.query
    leaveModel.allLeave().then((data) => {
      return leaveModel.leaveWellPage(Number(pageSize), (pageNo - 1) * pageSize)      
    }).then((data) => {
      res.send(dataModel(1, '', {
        totalCount: Number(data.count),
        pageSize: Number(pageSize),
        pageNo: Number(pageNo),
        list: data.rows
      }))
    }).catch((data) => {
       console.log(data)
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }

  /**
   * @class addLeave 
   * 
   * @static addLeave
   * 
   * @param {title} 内容标题
   * 
   * @param {user} 人员名称
   * 
   * @param {content} 留言内容
   * 
   * @param {createTime} 创建时间
   */
  
  static addLeave (req, res, next) {
    let { title, name, content } = req.body
    let createTime = new Date().getTime()
    // 创建新留言
    leaveModel.addLeave(title, name, createTime, content).then((data) => {
      res.send(dataModel(1, '留言成功', {}))
    }).catch((data) => {
      console.log(data)
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }

  /**
   * @class deleteLeave
   * 
   * @static deleteLeave
   * 
   * @param {id} 留言id
   */

  static deleteLeave (req, res, next) {
    let { id } = req.body
    leaveModel.deleteLeave(id).then((data) => {
      res.send(dataModel(1, '删除成功', {}))
    }).catch((data) => {
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }

  /**
  * @class viewDetail 
  * 
  * @static viewDetail
  * 
  * @param {id} 留言id
  */

  static viewDetail (req, res, next) {
    let { id } = req.query
    leaveModel.viewDetail(id).then((data) => {
      res.send(dataModel(1, '', data[0]))
    }).catch((data) => {
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }

}

module.exports = leaveController
