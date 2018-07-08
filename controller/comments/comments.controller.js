/**
 * @class comments 
 * 
 * @static comments
 */

const commentsModel = require('./../../model/comments/index.model')

const email = require('./../../tool/email').sendEmail

const dataModel = require('./../../config/index').DATA

class comments {
  /**
   * @class addComments 添加评论
   * 
   * @static addComments
   * 
   * @param {id} 文章id
   * 
   * @param {content} 评论内容
   * 
   * @param {commentUser} 评论人
   * 
   * @param {commentMinUser} 回复评论人
   * 
   * @param {parentId} 评论父id (只要第一层评论下)
   */

  static addComment (req, res, next) {
    let {commentUser, id, commentMinUser, parentId, content} = req.body
    // if (req.session.init) {
      commentsModel.addComment(commentUser, id, commentMinUser, parentId, content).then((data) => {
        if (commentMinUser) {
          commentsModel.selectUser(commentMinUser).then((nick) => {
            email({
              to: nick[0][0].email,
              subject: `${commentUser}评论了您的评论`,
              text: `${commentUser}回复了您的评论 请注意查收`,
              html: `<div>
                      <p style='font-size: 24px;'>${commentUser}回复了您的评论</p>
                      <img style='width: 100%;' src="cid:00000001"/>
                      <p style='width: 100%; text-align: right;'><strong>[<a href='http://www.scrscript.com/static/BLOG.png'>点击查看详情</a>]</strong></p>
                    </div>`,
              attachments: [{
                filename: '怎样.png',
                path: 'http://www.scrscript.com/static/BLOG.png',
                cid: '00000001'
              }]
            })
          })
        } else {
          commentsModel.articleUser(id).then((nick) => {
            email({
              to: 'scrscript@163.com',
              subject: `${commentUser}评论了您的文章`,
              text: `${commentUser}评论了您的文章, 请注意查收`,
              html: `<div>
                      <p style='font-size: 24px;'>${commentUser}评论了您的文章</p>
                      <img style='width: 100%;' src="cid:00000001"/>
                      <p style='width: 100%; text-align: right;'><strong>[<a href='http://www.scrscript.com/static/BLOG.png'>点击查看详情</a>]</strong></p>
                    </div>`,
              attachments: [{
                filename: '怎样.png',
                path: 'http://www.scrscript.com/static/BLOG.png',
                cid: '00000001'
              }]
            })
          })
        }
        res.send(dataModel(1, '评论成功', {}))
      }).catch((data) => {
        console.log(data)
        res.send(dataModel(-1, '服务器忙', {}))
      })
    // } else {
    //   res.send(dataModel(-2, '请登录', {}))
    // }
  }

  /**
   * @class deleteComment
   * 
   * @static deleteComment
   * 
   * @param {articleId} 文章id
   */

  static deleteComment (req, res, next) {
    let {articleId} = req.body
    commentsModel.deleteComment(articleId).then((data) => {
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
}

module.exports = comments