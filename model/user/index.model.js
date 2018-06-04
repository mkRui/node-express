const Sequelize = require('sequelize');
const sequelize = require('./../../config/index').SEQUELIZE;

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
  },
  userState: {
    type: Sequelize.INTEGER,
    field: 'user_state'
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


exports.selectUser = (nickName, passWord) => {
  return userControl.findAll({
    include: [{
      model: roleControl,
      required: true
    }],
    where: {
      nickName: nickName,
      passWord: passWord
    }
  })
}


exports.addUser = (userName, passWord, nickName, email) => {
  return userControl.create({
    userName: userName,
    passWord: passWord,
    nickName: nickName,
    email: email
  })
}

exports.selectNickName = (nickName) => {
  return userControl.findAll({
    where: {
      nickName: nickName
    }
  })
}

exports.updateUserState = (id, state) => {
  return userControl.update({
    userState: state,
  }, {
    where: {
      id: id
    }
  })
}

exports.selectAllUser = () => {
  return userControl.findAll()
}

exports.updateUserInfo = (id, nickName, email, UserRoleId) => {
  return userControl.update({
    nickName: nickName,
    email: email,
    UserRoleId: UserRoleId
  }, {
    where: {
      id: id
    }
  })
}
