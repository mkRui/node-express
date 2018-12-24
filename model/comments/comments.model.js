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
  commentsArticleId: {
    type: Sequelize.INTEGER,
    field: 'comments_articleId'
  },
  commentsPraise: {
    type: Sequelize.INTEGER,
    field: 'comments_praise'
  },
  replyUser: {
    type: Sequelize.STRING,
    field: 'comments_replyuser'
  },
  replyUserId: {
    type: Sequelize.STRING,
    field: 'comments_replyid'
  },
  commentsParentid: {
    type: Sequelize.INTEGER,
    field: 'comments_parentid'
  },
  commentsNum: {
    type: Sequelize.STRING,
    field: 'comments_num'
  },
  face: {
    type: Sequelize.STRING,
    field: 'comments_face'
  },
  admin: {
    type: Sequelize.INTEGER,
    field: 'comments_admin'
  }
}, {
  timestamps: false,
  freezeTableName: true
})

// 获取当前登录用户的评论列表
exports.getCommentList = function (articleId, pageNo, pageSize) {
  console.log(articleId)
  if (articleId) {
    return comments.findAndCountAll({
      where: {
        $or: [
          {commentsArticleId: articleId}
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
    order: [
      ['id', 'DESC'],
      ['comments_praise', 'DESC']
    ],
    offset: pageNo,
    limit: pageSize
  })
}

// 新增评论
exports.addComment = function (commentsUser, commentsArticleId, replyUser, commentsParentid, commentsContent, replyUserId, admin = 0) {
  return comments.create({
    commentsUser: commentsUser,
    commentsArticleId: commentsArticleId,
    replyUser: replyUser,
    commentsParentid: commentsParentid,
    commentsContent: commentsContent,
    commentsTime: new Date().getTime(),
    replyUserId: replyUserId,
    admin: admin
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

// 关联查询的例子
exports.articleUser = function (id) {
  return sequelize.query(`SELECT email FROM article_control as ar
  LEFT JOIN user_control ur ON ar.article_create_user=ur.nickname
  WHERE ar.id=${id}`)
}
