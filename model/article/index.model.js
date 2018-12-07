const Sequelize = require('sequelize');
const sequelize = require('./../../config/index').SEQUELIZE;

const article = sequelize.define('article_control', {
  articleTitle: {
    type: Sequelize.STRING,
    field: 'article_title'
  },
  articleMin: {
    type: Sequelize.STRING,
    field: 'article_min'
  },
  articleContent: {
    type: Sequelize.STRING,
    field: 'article_content'
  },
  praise: {
    type: Sequelize.INTEGER
  },
  createTime: {
    type: Sequelize.DATE,
    field: 'create_time'
  },
  readArticleNumber: {
    type: Sequelize.INTEGER,
    field: 'read_article_number'
  },
  articleCreateUser: {
    type: Sequelize.STRING,
    field: 'article_create_user'
  },
  articleComments: {
    type: Sequelize.INTEGER,
    field: 'article_comments'
  },
  articleTag: {
    type: Sequelize.STRING,
    field: 'article_tag'
  },
  articleClassification: {
    type: Sequelize.STRING,
    field: 'article_classification'
  },
  state: {
    type: Sequelize.INTEGER,
    field: 'article_state'
  },
  draft: {
    type: Sequelize.INTEGER,
    field: 'article_draft'
  },
  cover: {
    type: Sequelize.STRING,
    field: 'article_cover'
  },
  flag: {
    type: Sequelize.INTEGER,
    field: 'article_flag'
  }
}, {
  timestamps: false,
  freezeTableName: true
});

exports.addArticle = function (
    articleTitle,
    articleMin,
    articleContent,
    createTime,
    articleTag,
    articleClassification,
    state,
    draft,
    articleCreateUser,
    cover,
    id = ''
  ) {
  if (id) {
    return article.update({
      articleTitle: articleTitle,
      articleMin: articleMin,
      articleContent: articleContent,
      createTime: createTime,
      articleTag: articleTag,
      articleClassification: articleClassification,
      state: state,
      draft: draft,
      articleCreateUser: articleCreateUser,
      cover: cover
    }, {
      where: {
        id: id
      }
    })
  } else {
    return article.create({
      articleTitle: articleTitle,
      articleMin: articleMin,
      articleContent: articleContent,
      createTime: createTime,
      articleTag: articleTag,
      articleClassification: articleClassification,
      state: state,
      draft: draft,
      articleCreateUser: articleCreateUser,
      cover: cover
    })
  }
}

exports.selectArticle = function (articleTitle) {
  return article.findAll({
    where: {
      articleTitle: articleTitle
    }
  })
}

exports.selectArticlePage = function (state, submit, tag, classify, keyWord, pageNo, pageSize) {
  return article.findAndCountAll({
    where: {
      state: {
        $like: `%${state}%`
      },
      draft: {
        $like: `%${submit}%`
      },
      articleTag: {
        $like: `%${tag}%`
      },
      articleClassification: {
        $like: `%${classify}%`
      },
      articleTitle: {
        $like: `%${keyWord}%`
      }
    },
    order: [
      ['id', 'DESC'],
      ['article_flag', 'DESC']
    ],
    offset: pageNo,
    limit: pageSize
  })
}

exports.selectArticleId = function (id) {
  return article.findAll({
    where: {
      id: id
    }
  })
}

exports.deleteArticle = function (id) {
  return article.destroy({
    where: {
      id: id
    }
  })
}

exports.searchArticle = function (articleTitle = '') {
  return article.findAll({
    where: {
      articleTitle: {
        $like: `%${articleTitle}%`
      }
    }
  })
}

exports.articleRead = function () {
  return sequelize.query('SELECT read_article_number as readArticleNumber, article_title as articleTitle  FROM article_control ORDER BY read_article_number DESC LIMIT 5')
}

exports.articleSubmit = function () {
  return sequelize.query('SELECT article_create_user as articleCreateUser,COUNT(*) as Count FROM article_control GROUP BY article_create_user LIMIT 5')
}
