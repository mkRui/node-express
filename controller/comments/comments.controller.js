/**
 * @class comments 
 * 
 * @static comments
 */

const commentsModel = require('../../model/comments/comments.model')

const reviewersModel = require('../../model/comments/reviewers.model.js')

const articleModel = require('./../../model/article/index.model')

const userModel = require('./../../model/user/index.model')

const sendEmail = require('./../../tool/email').sendEmail

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
    * @param {replyid} 回复评论人id
    * 
    * @param {content} 内容
    * 
    * @param {adminflag} 是否为管理员所评论
    * 
    * @param {author} 作者
    * 
    */

  static addComment (req, res, next) {
    let {
      articleId,
      user,
      email,
      url = '',
      face = '',
      parentId = 0,
      replyUser = '',
      replyid = '',
      author,
      content,
      adminflag = false
    } = req.body
    if (req.session.init) {
      const session = req.session.init
      user = session.nickName
      face = session.userFace
    }
    if (!user && !email) {
      res.send(dataModel(-2, '请输入昵称/邮箱', {}))
    } else {
      if (req.session.blog) {
        // 给回复人发送邮件
        commentsModel.addComment(user, articleId, replyUser, parentId, content).then(() => {
          return Promise.all([ 
            reviewersModel.getReviewers(replyid),
            articleModel.addCommentsNum(articleId)
          ])
        }).then((data) => {
          sendEmail({
            to: data[0].email,
            subject: `${user}回复了您的评论`,
            text: `${user}回复了您的评论 请注意查收`,
            html: `<div>
                    <p style='font-size: 24px;'>${user}回复了您的评论</p>
                    <img style='width: 100%;' src="cid:00000001"/>
                    <p style='width: 100%; text-align: right;'><strong>[<a href='http://www.scrscript.com/static/BLOG.png'>点击查看详情</a>]</strong></p>
                  </div>`,
            attachments: [{
              filename: '怎样.png',
              path: 'http://www.scrscript.com/static/BLOG.png',
              cid: '00000001'
            }]
          })
          res.send(dataModel(1, '评论成功', {}))
        }).catch(() => {
          res.send(dataModel(-1, '服务器忙', {}))
        })
      } else {
        reviewersModel.getReviewers(email).then((data) => {
          if (data.length) {
            return data[0]
          } else {
            return reviewersModel.addReviewers(user, email, url, face)
          }
        }).then(async (data) => {
          if (parentId) {
            await Promise.all([
              commentsModel.addComment(user, articleId, replyUser, parentId, content, data.id),
              commentsModel.commentNum(parentId),
              articleModel.addCommentsNum(articleId)
            ])
          } else {
            await Promise.all([
              commentsModel.addComment(user, articleId, replyUser, parentId, content, data.id),
              articleModel.addCommentsNum(articleId)
            ])
          }
          if (adminflag) {
            return userModel.selectNickName(parentId ? replyUser : author)
          } else {
            return reviewersModel.getReviewers('', replyid)
          }
        }).then((data) => {
          if (data) {
            sendEmail({
              to: data[0].email,
              subject: !parentId ? `${user}评论了您的文章` : `${user}回复了您的评论`,
              text: !parentId ? `${user}评论了您的文章 请注意查收` : `${user}回复了您的评论 请注意查收`,
              html: `<div>
                      <p style='font-size: 24px;'>${!parentId ? user + '评论了您的文章' : user + '回复了您的评论'}</p>
                      <img style='width: 100%;' src="cid:00000001"/>
                      <p style='width: 100%; text-align: right;'><strong>[<a href='http://www.scrscript.com/static/BLOG.png'>点击查看详情</a>]</strong></p>
                    </div>`,
              attachments: [{
                filename: '怎样.png',
                path: 'http://www.scrscript.com/static/BLOG.png',
                cid: '00000001'
              }]
            })
          }
          res.send(dataModel(1, '评论成功', {}))
        }).catch((e) => {
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
   * @param {id}  评论id
   */

  static commentPraise (req, res, next) {
    let {id} = req.body
    commentsModel.commentPraise(id).then((data) => {
      res.send(dataModel(1, '点赞成功', {}))
    }).catch((data) => {
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