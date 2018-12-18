/**
 * @class comments 
 * 
 * @static comments
 */

const commentsModel = require('../../model/comments/comments.model')

const reviewersModel = require('../../model/comments/reviewers.model')

const email = require('./../../tool/email').sendEmail

const dataModel = require('./../../config/index').DATA

class comments {

  /**
   * 
   * @class comments 评论列表
   * 
   * @param articleId 文章id
   * 
   * @param pageNo 页数
   * 
   * @param pageSize 页数长度
   */

  static commentsList (req, res, next) {
    let {
      articleId = '',
      pageNo,
      pageSize
    } = req.query
    console.log(req.query)
    commentsModel.getCommentList(articleId, Number(pageNo - 1) * pageSize, Number(pageSize))
    .then((data) => {
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
    * @param {articleId} 文章id 
    * 
    * @param {user} 评论人
    * 
    * @param {email} 邮箱
    * 
    * @param {url} web站点
    * 
    * @param {face} face
    * 
    * @param {parentId} 评论父id
    * 
    * @param {replyUser} 回复评论人
    * 
    * @param {article} 文章
    * 
    * @param {content} 内容
    */

  static addComment (req, res, next) {
    let {
      article,
      articleId,
      user,
      email,
      url = '',
      face = '',
      parentId,
      replyUser,
      content
    } = req.body

    if (req.session.init || req.session.blog) {
      const session = req.session.init || req.session.blog
      user = session.nickName
      email = session.email
      face = session.userFace
    }

    if (!user && !email) {
      res.send(dataModel(-2, '请输入昵称/邮箱', {}))
    } else {
      if (req.session.blog.email || req.session.init.email) {
        // 已经评论过 且 已经存入数据库的人员
        commentsModel.addComment(user, articleId, article, replyUser, parentId, content).then(() => {
          if (parentId) {
            return Promise.all([
              reviewersModel.getReviewers('', parentId),
              commentsModel.commentNum(articleId)
            ])
          } else {
            // 没有被评论人 说明评论的是文章 给文章发布人发送邮件
          }
        }).then((data) => {
          // 查找并发邮件
          console.log(data)
          res.send(dataModel(1, '评论成功', {
            ...req.session.blog
          }))
        }).catch(() => {
          res.send(dataModel(-1, '服务器忙', {}))
        })
      } else {
        reviewersModel.getReviewers(email).then((data) => {
          if (data.length) {
            req.session.blog = {
              nickName: user,
              email: email,
              userFace: face,
              url: data[0].url
            }
            if (parentId) {
              // 给被评论人发邮件
              return Promise.all([
                commentsModel.addComment(user, articleId, article, replyUser, parentId, content),
                commentsModel.commentNum(articleId)
              ])
            } else {
              // 评论的文章 给作者发邮件
              return commentsModel.addComment(user, articleId, article, replyUser, parentId, content)
            }
          }
        }).then(() => {
          res.send(dataModel(1, '评论成功', {
            ...req.session.blog
          }))
        }).catch(() => {
          res.send(dataModel(-1, '服务器忙', {}))
        })
      }
    }

    // let {commentUser, articleId, article, commentMinUser, parentId, content} = req.body
    // if (req.session.init) {
    //   commentsModel.addComment(commentUser, articleId, article, commentMinUser, parentId, content).then((data) => {
    //     if (commentMinUser) {
    //       commentsModel.selectUser(commentMinUser).then((nick) => {
    //         email({
    //           to: nick[0][0].email,
    //           subject: `${commentUser}评论了您的评论`,
    //           text: `${commentUser}回复了您的评论 请注意查收`,
    //           html: `<div>
    //                   <p style='font-size: 24px;'>${commentUser}回复了您的评论</p>
    //                   <img style='width: 100%;' src="cid:00000001"/>
    //                   <p style='width: 100%; text-align: right;'><strong>[<a href='http://www.scrscript.com/static/BLOG.png'>点击查看详情</a>]</strong></p>
    //                 </div>`,
    //           attachments: [{
    //             filename: '怎样.png',
    //             path: 'http://www.scrscript.com/static/BLOG.png',
    //             cid: '00000001'
    //           }]
    //         })
    //       })
    //     } else {
    //       commentsModel.articleUser(id).then((nick) => {
    //         email({
    //           to: 'scrscript@163.com',
    //           subject: `${commentUser}评论了您的文章`,
    //           text: `${commentUser}评论了您的文章, 请注意查收`,
    //           html: `<div>
    //                   <p style='font-size: 24px;'>${commentUser}评论了您的文章</p>
    //                   <img style='width: 100%;' src="cid:00000001"/>
    //                   <p style='width: 100%; text-align: right;'><strong>[<a href='http://www.scrscript.com/static/BLOG.png'>点击查看详情</a>]</strong></p>
    //                 </div>`,
    //           attachments: [{
    //             filename: '怎样.png',
    //             path: 'http://www.scrscript.com/static/BLOG.png',
    //             cid: '00000001'
    //           }]
    //         })
    //       })
    //     }
    //     res.send(dataModel(1, '评论成功', {}))
    //   }).catch((data) => {
    //     console.log(data)
    //     res.send(dataModel(-1, '服务器忙', {}))
    //   })
    // } else {
    //   res.send(dataModel(-2, '请登录', {}))
    // }
  }

  /**
   * @class deleteComment
   * 
   * @static deleteComment
   * 
   * @param {id} 评论id
   */

  static deleteComment (req, res, next) {
    let {id} = req.body
    commentsModel.deleteComment(id).then((data) => {
      res.send(dataModel(1, '删除成功', {}))
    }).catch((data) => {
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }

  /**
   * @class commentDetails
   * 
   * @static commentDetails
   * 
   * @param {articleId} 文章id
   */

  static commentDetails (req, res, next) {
    let {articleId} = req.body
    commentsModel.commentDetails(articleId).then((data) => {
      res.send(dataModel(1, '', data[0]))
    }).catch((data) => {
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }

  /**
   * @class commentPraise
   * 
   * @static commentPraise
   * 
   * @param {articleId} 文章id
   */

  static commentPraise (req, res, next) {
    let {articleId} = req.body
    commentsModel.commentPraise(articleId).then((data) => {
      res.send(dataModel(1, '点赞成功', {}))
    }).catch((data) => {
      console.log(data)
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }


  /**
   * @param {articleId} 文章id
   * 
   * @param {parentId} 父评论id
   * 
   * @param {pageNo} 页数
   * 
   * @param {pageSize} 每页个数
   */
  static getCommentsArticle (req, res, next) {
    let {articleId, parentId, pageNo, pageSize} = req.query
    commentsModel.getArticleComments(articleId, parentId, Number(pageNo - 1) * pageSize, Number(pageSize)).then((data) => {
      res.send(dataModel(1, '', {
        pageNo: Number(pageNo),
        pageSize: Number(pageSize),
        totalCount: data.count,
        list: data.rows
      }))
    }).catch(() => {
      res.send(dataModel(-1, '服务器忙', {}))
    })
  }
}

module.exports = comments