const Sequelize = require('sequelize');
const sequelize = require('./../../config/index');

const userControl = sequelize.define('user_control', {
  userName: {
    type: Sequelize.STRING,
    field: 'username'
  },
  UserRoleId: {
    type: Sequelize.INTEGER,
    field: 'user_role_id'
  },
  passWord: {
    type: Sequelize.STRING,
    field: 'password'
  },
  lastLogin: {
    type: Sequelize.INTEGER,
    field: 'last_login'
  },
  userFace: {
    type: Sequelize.INTEGER,
    field: 'userface'
  },
  email: {
    type: Sequelize.STRING,
    field: 'email'
  },
  nickName: {
    type: Sequelize.STRING,
    field: 'nickname'
  },
  createTime: {
    type: Sequelize.STRING,
    field: 'createtime'
  }
}, {
  underscored: true,
  timestamps: false,
  freezeTableName: true
})

const roleControl = sequelize.define('user_role', {
  roleName: {
    type: Sequelize.STRING,
    field: 'rolename'
  },
  types: {
    type: Sequelize.INTEGER,
    field: 'types'
  }
}, {
  timestamps: false,
  freezeTableName: true
})

userControl.belongsTo(roleControl)

exports.initPage = (userName, passWord) => {
  return userControl.findAll({
    include: [{
      model: roleControl,
      required: true
    }],
    where: {
      userName: userName,
      passWord: passWord
    }
  })
}