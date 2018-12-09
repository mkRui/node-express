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
    type: Sequelize.DATE,
    field: 'last_login'
  },
  userFace: {
    type: Sequelize.STRING,
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
    type: Sequelize.DATE,
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
    email: email,
    createTime: new Date().getTime()
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

exports.updateLoginTime = (id) => {
  return userControl.update({
    lastLogin: new Date().getTime(),
  }, {
    where: {
      id: id
    }
  })
}

exports.updateUserface = (id, userFace) => {
  return userControl.update({
    userFace: userFace,
  }, {
    where: {
      id: id
    }
  })
}

exports.selectAllUser = () => {
  return userControl.findAndCountAll({
    limit: 20
  })
}

// offset 代表初始值
// limit 分页数量
exports.userListPage = (pageNo, pageSize) => {
  return userControl.findAndCountAll({
    offset: pageNo,
    limit: pageSize
  })
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
