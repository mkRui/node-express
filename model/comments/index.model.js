const Sequelize = require('sequelize');
const sequelize = require('./../../config/index').SEQUELIZE;

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
    type: Sequelize.STRING,
    field: 'comments_time'
  },
  commentsArticle: {
    type: Sequelize.STRING,
    field: 'comments_article'
  },
  commentsPraise: {
    type: Sequelize.STRING,
    field: 'comments_praise'
  },
  commentsUserMin: {
    type: Sequelize.STRING,
    field: 'comments_user_min'
  },
  commentsParentid: {
    type: Sequelize.STRING,
    field: 'comments_parentid'
  }
}, {
  timestamps: false,
  freezeTableName: true
})

exports.addComment = function (commentsUser, commentsArticle, commentsUserMin, commentsParentid, commentsContent) {
  return comments.create({
    commentsUser: commentsUser,
    commentsArticle: commentsArticle,
    commentsUserMin: commentsUserMin,
    commentsParentid: commentsParentid,
    commentsContent: commentsContent,
    commentsTime: new Date().getTime()
  })
}

exports.deleteComment = function (id) {
  return comments.destroy({
    where: {
      id: id,
      commentsParentid: id
    }
  })
}

exports.commentDetails = function (id) {
  return comments.findAll({
    where: {
      id: id
    }
  })
}

exports.commentPraise = function (id) {
  return sequelize.query(`UPDATE comments SET comments_praise=comments_praise+1 WHERE id=${id}`)
}

exports.articleUser = function (id) {
  return sequelize.query(`SELECT email FROM article_control as ar
  LEFT JOIN user_control ur ON ar.article_create_user=ur.nickname
  WHERE ar.id=${id}`)
}

exports.selectUser = function (nickname) {
  return sequelize.query(`SELECT email FROM user_control WHERE nickName=${nickname}`)
}