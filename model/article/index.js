const Sequelize = require('sequelize');
const sequelize = require('./../../config/index');

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
    type: Sequelize.INTEGER,
    field: 'create-time'
  },
  readArticleNumber: {
    type: Sequelize.INTEGER,
    field: 'read_article_number'
  },
  articleComments: {
    type: Sequelize.INTEGER,
    field: 'article_comments'
  },
  articleNum: {
    type: Sequelize.INTEGER,
    field: 'article_num'
  },
  articleTag: {
    type: Sequelize.STRING,
    field: 'article_tag'
  },
  articleClassification: {
    type: Sequelize.INTEGER,
    field: 'article_classification'
  }
}, {
  timestamps: false,
  freezeTableName: true
});

// 添加文章
exports.addArticle = function (articleTitle, articleMin, articleContent, praise, createTime, readArticleNumber, articleComments, articleNum, articleTag, articleClassification) {
  console.log(articleTitle)
  return article.create({
    articleTitle: articleTitle,
    articleMin: articleMin,
    articleContent: articleContent
    // praise: praise,
    // createTime: createTime,
    // read_article_number: readArticleNumber,
    // article_comments: articleComments,
    // article_num: articleNum,
    // article_tag: articleTag,
    // article_classification: articleClassification
  })
}