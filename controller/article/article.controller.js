
/**
 * @class article 关于文章的操作
 */

class article {

  /**
   * @class addArticle 添加文章
   * 
   * @static addArticle
   * 
   * @param {req} 请求
   * 
   * @param {res} 返回
   * 
   * @param {next} 传递
   */
  static addArticle (req, res, next) {
    const receive = req.query()
    console.log()
  }
}

module.exports = article