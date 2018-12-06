const Sequelize = require('sequelize');
const sequelize = require('./../../config/index').SEQUELIZE;

const global = sequelize.define('global', {
  title: {
    type: Sequelize.STRING,
    field: 'title'
  },
  cooperation: {
    type: Sequelize.STRING,
    field: 'cooperation'
  },
  movie: {
    type: Sequelize.STRING,
    field: 'movie'
  },
  music: {
    type: Sequelize.STRING,
    field: 'music'
  },
  hobby: {
    type: Sequelize.STRING,
    field: 'hobby'
  },
  feelingsTitle: {
    type: Sequelize.STRING,
    field: 'feelings_title'
  },
  introduce: {
    type: Sequelize.STRING,
    field: 'introduce'
  },
  feelingsMinTitle: {
    type: Sequelize.STRING,
    field: 'feelings_min_title'
  },
  feelingsContent: {
    type: Sequelize.STRING,
    field: 'feelings_content'
  },
  codeCooperation: {
    type: Sequelize.STRING,
    field: 'code_cooperation'
  },
  authorTitle: {
    type: Sequelize.STRING,
    field: 'author_title'
  },
  authorFace: {
    type: Sequelize.STRING,
    field: 'author_face'
  },
  authorImg: {
    type: Sequelize.STRING,
    field: 'author_img'
  }
}, {
  timestamps: false,
  freezeTableName: true
})

exports.updateGlobal = function (
  title,
  cooperation,
  movie,
  music,
  hobby,
  feelingsTitle,
  feelingsMinTitle,
  feelingsContent,
  introduce,
  codeCooperation,
  authorTitle,
  authorFace,
  authorImg
) {
  return global.update({
    title: title,
    cooperation: cooperation,
    movie: movie,
    music: music,
    hobby: hobby,
    feelingsTitle: feelingsTitle,
    feelingsMinTitle: feelingsMinTitle,
    feelingsContent: feelingsContent,
    introduce: introduce,
    codeCooperation: codeCooperation,
    authorTitle: authorTitle,
    authorFace: authorFace,
    authorImg: authorImg
  }, {
    where: {
      id: 1
    }
  })
}

exports.detailGlobal = function (id) {
  return global.findAll({
    where: {
      id: id
    }
  })
}
