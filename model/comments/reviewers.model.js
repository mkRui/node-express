const Sequelize = require('sequelize');
const sequelize = require('../../config/index').SEQUELIZE;

const reviewers = sequelize.define('user_comments', {
  name: {
    type: Sequelize.STRING,
    field: 'nick_name'
  },
  email: {
    type: Sequelize.STRING,
    field: 'email'
  },
  url: {
    type: Sequelize.DATE,
    field: 'web_url'
  },
  face: {
    type: Sequelize.STRING,
    field: 'user_face'
  }
}, {
  timestamps: false,
  freezeTableName: true
})

// 查找评论者
exports.getReviewers = (email) => {
  return reviewers.findAll({
    where: {
      email: email
    }
  })
}

// 新增评论者 或者修改人员头像像
exports.addReviewers = (name, email, url, face = '', id = '') => {
  if (id) {
    return article.update({
      face: face
    }, {
      where: {
        id: id
      }
    })
  } else {
    return article.create({
      name: name,
      email: email,
      url: url,
      face: face
    })
  }
}



