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