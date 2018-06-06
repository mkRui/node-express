/**
 * @class panel 
 * 
 * @static panel
 */

 const articleControl = require('./../../model/article/index.model')

 const dataModel = require('./../../config/index').DATA

class panel {

  /**
   * @class statistical
   * 
   * @static statistical
   */

  static statistical (req, res, next) {
    articleControl.selectAllArticle().then((data) => {
      let statisticalList = [{state: 1, totalCount: 0}, {state: 2, totalCount: 0}, {state: 3, totalCount: 0}, {state: 4, totalCount: 0}]
      data.forEach((elem, index) => {
        if (Number(elem.draft) === 1) {
          statisticalList[1].totalCount += 1
        } else if (Number(elem.draft) === 0) {
          statisticalList[0].totalCount += 1
        }
        statisticalList[2].totalCount += Number(elem.articleComments)
        statisticalList[3].totalCount += Number(elem.praise)
      })
      res.send(dataModel(1, '', statisticalList))
    }).catch((data) => {
      console.log(data)
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }

  /**
   * @class submitArticle
   * 
   * @static submitArticle
   */

  static submitArticle (req, res, next) {
    articleControl.articleSubmit().then((data) => {
      res.send(dataModel(1, '', data[0]))
    }).catch((data) => {
      console.log(data)
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }

  /**
   * @class articleRead
   * 
   * @class articleRead
   */

  static articleRead (req, res, next) {
    articleControl.articleRead().then((data) => {
      res.send(dataModel(1, '', data[0]))
    }).catch((data) => {
      console.log(data)
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }


}

module.exports = panel