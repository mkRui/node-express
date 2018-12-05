const Sequelize = require('sequelize');
const sequelize = require('./../../config/index').SEQUELIZE;

const tag = sequelize.define('tag_control', {
  tagTitle: {
    type: Sequelize.STRING,
    field: 'tag_title'
  },
  tagType: {
    type: Sequelize.INTEGER,
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
    type: Sequelize.DATE,
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

// offset 代表初始值
// limit 分页数量
exports.tagPage = (pageSize, pageNo, tagState) => {
  return tag.findAndCountAll({
    where: {
      tagType: {
        $like: `%${tagState}%`
      }
    },
    offset: pageNo,
    limit: pageSize
  })
}

exports.selectTag = (tagTitle) => {
  return tag.findAll({
    where: {
      tagTitle, tagTitle
    }
  })
}

exports.selectTagList = (id) => {
  let idArr = id.split(',')
  return tag.findAll({
    where: {
      id: {
        $in: idArr
      }
    }
  })
}

