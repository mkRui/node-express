const Sequelize = require('sequelize');
const sequelize = require('../../config/index').SEQUELIZE;

const comments = sequelize.define('comments', {
  commentsContent: {
    type: Sequelize.STRING,
    field: 'comments_content'
  },
  commentsUser: {
    type: Sequelize.STRING,
    field: 'comments_user'
  },
  commentsTime: {
    type: Sequelize.DATE,
    field: 'comments_time'
  },
  commentsArticle: {
    type: Sequelize.STRING,
    field: 'comments_article'
  },
  commentsArticleId: {
    type: Sequelize.INTEGER,
    field: 'comments_articleId'
  },
  commentsPraise: {
    type: Sequelize.INTEGER,
    field: 'comments_praise'
  },
  commentsUserMin: {
    type: Sequelize.STRING,
    field: 'comments_user_min'
  },
  commentsParentid: {
    type: Sequelize.INTEGER,
    field: 'comments_parentid'
  },
  commentsNum: {
    type: Sequelize.STRING,
    field: 'comments_user_min'
  },
  face: {
    type: Sequelize.STRING,
    field: 'comments_face'
  }
}, {
  timestamps: false,
  freezeTableName: true
})

// 获取当前登录用户的评论列表
exports.getCommentList = function (articleId, commentsUserMin, pageNo, pageSize) {
  if (articleId) {
    return comments.findAndCountAll({
      where: {
        $or: [
          {commentsArticleId: articleId},
          {commentsUserMin: commentsUserMin}
        ]
      },
      order: [
        ['id', 'DESC']
      ],
      offset: pageNo,
      limit: pageSize
    })
  } else {
    return comments.findAndCountAll({
      order: [
        ['id', 'DESC'],
      ],
      where: {
        commentsUserMin: commentsUserMin
      },
      offset: pageNo,
      limit: pageSize
    })
  }
}

exports.getArticleComments = function (commentsArticleId, commentsParentid, pageNo, pageSize) {
  return comments.findAndCountAll({
    where: {
      commentsArticleId: commentsArticleId,
      commentsParentid: commentsParentid,
    },
    offset: pageNo,
    limit: pageSize
  })
}

// 新增评论
exports.addComment = function (commentsUser, commentsArticleId, commentsArticle, commentsUserMin, commentsParentid, commentsContent) {
  return comments.create({
    commentsUser: commentsUser,
    commentsArticle: commentsArticle,
    commentsArticleId: commentsArticleId,
    commentsUserMin: commentsUserMin,
    commentsParentid: commentsParentid,
    commentsContent: commentsContent,
    commentsTime: new Date().getTime()
  })
}

// 删除评论
exports.deleteComment = function (id) {
  return comments.destroy({
    where: {
      $or: {
        id: id,
        commentsParentid: id
      }
    }
  })
}

// 评论详情
exports.commentDetails = function (id) {
  return comments.findAll({
    where: {
      id: id
    }
  })
}

// 评论点赞
exports.commentPraise = function (id) {
  return sequelize.query(`UPDATE comments SET comments_praise=comments_praise+1 WHERE id=${id}`)
}

// 回复评论
exports.commentNum = function (id) {
  return sequelize.query(`UPDATE comments SET comments_num=comments_num+1 WHERE id=${id}`)
}

exports.articleUser = function (id) {
  return sequelize.query(`SELECT email FROM article_control as ar
  LEFT JOIN user_control ur ON ar.article_create_user=ur.nickname
  WHERE ar.id=${id}`)
}

exports.selectUser = function (nickname) {
  return sequelize.query(`SELECT email FROM user_control WHERE nickName=${nickname}`)
}