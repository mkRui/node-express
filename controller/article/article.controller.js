
/**
 * @class article 关于文章的操作
 */

const articleControl = require('./../../model/article/index.model')

const tag = require('./../../model/tag/index.model')

const dataModel = require('./../../config/index').DATA

const fs = require('fs')

const path = require('path')

class article {

  /**
   * @class addArticle 添加文章
   * 
   * @static addArticle
   * 
   * @param {title} 文章标题
   * 
   * @param {minTitle} 文章副标题
   * 
   * @param {content} 文章内容位
   * 
   * @param {classify} 文章分类 分类只能写一个
   * 
   * @param {tag} 文章标签 标签写多个 以逗号分开
   * 
   * @param {state} 文章状态 1 公开 0 私密
   * 
   * @param {submit} 文章发布地址 1 已发布 0 草稿箱
   * 
   * @param {articleCreateUser} 文章发布人 不用传输直接读取session\
   * 
   * @param {cover} 文章封面
   */

  static addArticle (req, res, next) {
    let {
      title,
      minTitle,
      classify,
      tag,
      state = 1,
      submit = 1,
      content,
      cover,
      id = ''
    } = req.body
    if (req.session.init) {
      articleControl.selectArticle(title).then((data) => {
        if (data.length) {
          return false
        } else {
          return articleControl.addArticle(
            title,
            minTitle,
            content,
            new Date().getTime(),
            tag,
            classify,
            state,
            submit,
            req.session.init.nickName,
            cover,
            id
          )
        }
      }).then((data) => {
        if (data) {
          if (Number(submit) === 1) {
            res.send(dataModel(1, '发布成功', {}))
          } else {
            res.send(dataModel(-1, '已存入草稿箱', {}))
          }
        } else {
          res.send(dataModel(-1, '文章标题重复 请更换标题', {}))
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
   * @class articleImg
   * 
   * @static articleImg
   */

  static articleImg (req, res, next) {
    const files = req.file.path + path.parse(req.file.originalname).ext
    fs.rename(req.file.path, files, (err, data) => {
      if (err) {
        res.send(dataModel(-1, '服务器忙', {}))
      } else {
        res.send(dataModel(1, '上传成功', {
          fileName: req.file.filename + path.parse(req.file.originalname).ext,
          filePath: `http://localhost:3000/blogApp/static/${req.file.filename + path.parse(req.file.originalname).ext}`
        }))
      }
    })
  }
  
  /**
   * @class articlePage
   * 
   * @static articlePage
   * 
   * @param {state} 文章状态 ‘’ 全部 1 公开 0 私密
   * 
   * @param {submit} 文章发布地址 ‘’ 全部 1 已发布 0 草稿箱
   * 
   * @param {tag} 文章标签
   * 
   * @param {classify} 文章分类
   * 
   * @param {keyWord} 搜索文章关键字
   * 
   * @param {pageNo} 当前页数
   * 
   * @param {pageSize} 每夜多少条
   */

  static articlePage (req, res, next) {
    let {
      state = '',
      submit = '',
      tag = '',
      classify = '',
      keyWord = '',
      pageNo = 1,
      pageSize = 5
    } = req.query
    articleControl.selectArticlePage(state, submit, tag, classify, keyWord, Number(pageNo - 1) * pageSize, Number(pageSize)).then((data) => {
      res.send(dataModel(1, '', {
        pageNo: Number(pageNo),
        pageSize: Number(pageSize),
        totalCount: data.count,
        list: data.rows
      }))
    }).catch((data) => {
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }

  /**
   * 
   * @param {pageNo} 页数 
   * 
   * @param {pageSize} 每页多少个 
   */
  static getHotArticle (req, res, next) {
    let { pageNo, pageSize } = req.query
    articleControl.hotArticleList(Number(pageNo - 1) * pageSize, Number(pageSize)).then((data) => {
      res.send(dataModel(1, '', {
        pageNo: Number(pageNo),
        pageSize: Number(pageSize),
        totalCount: data.count,
        list: data.rows
      }))
    }).catch((data) => {
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }

  /**
   * @class articleDetail
   * 
   * @static articleDetail
   * 
   * @param {id} 文章id
   */

  static articleDetail (req, res, next) {
    let {id} = req.query
    let articleInfo
    articleControl.selectArticle(id).then((data) => {
      let {
        id,
        articleTitle,
        articleMin,
        articleContent,
        praise,
        readArticleNumber,
        createTime,
        articleTag,
        articleClassification,
        cover,
        state,
        draft
      } = data[0]
      articleInfo = {
        id: Number(id),
        title: articleTitle,
        titleMin: articleMin,
        content: articleContent,
        praise: Number(praise),
        readerNum: Number(readArticleNumber),
        createTime: createTime,
        tag: articleTag,
        classify: articleClassification,
        cover: cover,
        state: Number(state),
        draft: Number(draft)
      }
      res.send(dataModel(1, '', articleInfo))
    }).catch((data) => {
      console.log(data)
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }

  /**
   * @class deleteArticle
   * 
   * @static deleteArticle
   * 
   * @param {id} 文章id
   */
  static deleteArticle (req, res, next) {
    let {id} = req.body
    articleControl.deleteArticle(id).then((data) => {
      res.send(dataModel(1, '删除成功', {}))
    }).catch((data) => {
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }

  /**
   * @class searchArticle
   * 
   * @param articleTitle
   */

   static searchArticle (req, res, next) {
    let {
      articleTitle = ''
    } = req.query
    articleControl.searchArticle(articleTitle)
    .then((data) => {
      res.send(dataModel(1, '', data))
    }).catch((data) => {
      res.send(dataModel(-1, '服务器忙', {}))
    })
   }



}

module.exports = article