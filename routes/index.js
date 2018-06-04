const express = require('express');
const router = express.Router();
const controller = require('./../controller/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('this is Blog welcome in')
});

// 初始化
router.get('/initPage', controller.user.initPage);

// 登录注册
router.post('/addUser', controller.user.addUser)

router.post('/login', controller.user.login)

// 修改人员的状态
router.post('/user/updateState', controller.user.updateState)

router.post('/user/updateInfo', controller.user.updateInfo)

// 留言墙
router.post('/leaveWell/addLeave', controller.leaveWell.addLeave)

router.post('/leaveWell/deleteLeave', controller.leaveWell.deleteLeave)

router.post('/leaveWell/viewDetail', controller.leaveWell.viewDetail)

router.get('/leaveWell/allLeaveList', controller.leaveWell.allLeaveList)

// 文章
router.post('/article/addArticle', controller.article.addArticle)



module.exports = router;
