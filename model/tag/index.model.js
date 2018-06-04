const Sequelize = require('sequelize');
const sequelize = require('./../../config/index').SEQUELIZE;

const tag = sequelize.define('tag_control', {
  tagTitle: {
    type: Sequelize.STRING,
    field: 'tag_title'
  },
  tagType: {
    type: Sequelize.STRING,
    field: 'tag_type'
  },
  tagCreateUser: {
    type: Sequelize.STRING,
    field: 'tag_create_user'
  },
  tagInstructions: {
    type: Sequelize.STRING,
    field: 'tag_instructions'
  },
  createTime: {
    type: Sequelize.STRING,
    field: 'create_time'
  }
}, {
  timestamps: false,
  freezeTableName: true
})

exports.addTag = (tagTitle, tagType, tagCreateUser, tagInstructions, createTime) => {
  return tag.create({
    tagTitle: tagTitle,
    tagType: tagType,
    tagCreateUser: tagCreateUser,
    tagInstructions: tagInstructions,
    createTime: createTime
  })
}

exports.updateTag = (id, tagInstructions) => {
  return tag.update({
    tagInstructions: tagInstructions
  }, {
    where: {
      id: id
    }
  })
}

exports.deleteTag = (id) => {
  return tag.destroy({
    where: {
      id: id
    }
  })
}

exports.tagPage = (PageSize, PageNo) => {
  return tag.findAndCountAll({
    offset: PageNum,
    limit: currentPage
  })
}

