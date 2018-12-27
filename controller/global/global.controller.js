/**
 * @class global 全局设置
 * 
 * @static global
 */

const globalModel = require('./../../model/global/index.model')

const dataModel = require('./../../config/index').DATA

const fs = require('fs')

class global {
  /**
   * @class globalUpdate
   * 
   * @static globalUpdate
   * 
   * @param {title} 标题
   * 
   * @param {cooperation} 合伙人
   * 
   * @param {movie} 电影
   * 
   * @param {music} 音乐
   * 
   * @param {hobby} 爱好
   * 
   * @param {feelingsTitle} 感情标题
   * 
   * @param {feelingsMinTitle} 感情副标题
   * 
   * @param {feelingsContent} 感情内容
   * 
   * @param {introduce} 说明
   * 
   * @param {codeCooperation} 联合开发人 string
   * 
   * @param {authorTitle} 作者标题
   * 
   * @param {authorFace} 作者展示图
   * 
   * @param {authorImg} 作者大头像
   */

  static editGlobal (req, res, next) {
    let {
      title,
      cooperation,
      movie,
      music,
      hobby,
      feelingsTitle,
      feelingsMinTitle,
      feelingsContent,
      introduce,
      codeCooperation,
      authorTitle,
      authorFace,
      authorImg
    } = req.body
    globalModel.updateGlobal(
      title,
      cooperation,
      movie,
      music,
      hobby,
      feelingsTitle,
      feelingsMinTitle,
      feelingsContent,
      introduce,
      codeCooperation,
      authorTitle,
      authorFace,
      authorImg)
    .then((data) => {
      res.send(dataModel(1, '保存成功', {}))
    }).catch((data) => {
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }

  /**
   * 
   * @param { id } 全局设置id 
   */
  static detailGlobal (req, res, next) {
    let { id } = req.query
    globalModel.detailGlobal(id)
    .then((data) => {
      res.send(dataModel(1, '', data[0]))
    }).catch((data) => {
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }

  static renderFile (req, res, next) {
    fs.readFile(`../static/${req.params.img}`, (err, data) => {
      if (err) {
        res.send(dataModel(-1, '您查找的文件不存在', {}))
      } else {
        res.header("Content-Type", 'image*')
        res.send(data)
      }
    })
  }
}

module.exports = global