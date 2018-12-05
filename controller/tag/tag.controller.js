/**
 * @class tag 标签管理
 * 
 * @static tag
 */

const tagModel = require('./../../model/tag/index.model')

const dataModel = require('./../../config/index').DATA

class tag {
  /**
   * @class allTagPage
   * 
   * @static allTagPage
   * 
   * @param {pageNo} 当前第几页
   * 
   * @param {pageSize} 每夜几条数据
   * 
   * @param {tagState} ‘’ 全部 1 标签 0 分类
   */

  static allTagPage (req, res, next) {
    let {
      pageNo,
      pageSize,
      tagState = ''
    } = req.query
    tagModel.tagPage(Number(pageSize), (pageNo - 1) * pageSize, tagState).then((data) => {
      res.send(dataModel(1, '', {
        pageNo: Number(pageNo),
        pageSize: Number(pageSize),
        totalCount: data.count,
        list: data.rows
      }))
    }).catch((data) => {
      console.log(data)
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }

  /**
   * @class addPageState
   * 
   * @static addPageState
   * 
   * @param {tagTitle} 名称
   * 
   * @param {tagInstructions} 说明
   * 
   * @param {tagType} 1 标签 0 分类
   */

  static addPageState (req, res, next) {
    let {tagTitle, tagInstructions, tagType} = req.body
    if (req.session.init) {
      tagModel.selectTag(tagTitle).then((data) => {
        if (!data.length) {
          return tagModel.addTag(tagTitle, tagType, req.session.init.nickName, tagInstructions, new Date().getTime())
        } else {
          return false
        }
      }).then((data) => {
        if (data) {
          res.send(dataModel(1, '添加成功', {}))
        } else {
          res.send(dataModel(1, '已有该分类', {}))
        }
      }).catch((data) => {
        console.log(data)
        res.send(dataModel(-1, '服务器忙', {}))
      })
    } else {
      res.send(dataModel(-2, '请登录', {}))
    }
  }

  /**
   * @class updateTagInfo
   * 
   * @static updateTagInfo
   * 
   * @param {id} 标签的id
   * 
   * @param {instructions} 要更改的标签说明
   */

  static updateTagInfo (req, res, next) {
    let {id, instructions} = req.body
    tagModel.updateTag(id, instructions).then((data) => {
      console.log(data)
      res.send(dataModel(1, '修改成功', {}))
    }).catch((data) => {
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }

  /**
   * @class deleteTag
   * 
   * @static deleteTag
   * 
   * @param {id} 标签的id
   */

  static deleteTag (req, res, next) {
    let {id} = req.body
    tagModel.deleteTag(id).then((data) => {
      res.send(dataModel(1, '删除成功', {}))
    }).catch((data) => {
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }
}

module.exports = tag