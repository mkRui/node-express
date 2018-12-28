const express = require('express');
const router = express.Router();
const controller = require('./../controller/index')
const multer = require('multer')
const uploadImg = multer({dest: './../static'})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('this is Blog welcome in')
});

/**
 * 图片路径映射
 */
router.get('/static/:img', controller.global.renderFile);

// 初始化
router.get('/initPage', controller.user.initPage);

// 登录注册
router.post('/addUser', controller.user.addUser)

router.post('/login', controller.user.login)

// 人员管理
router.post('/user/updateState', controller.user.updateState)

router.post('/user/updateInfo', controller.user.updateInfo)

router.get('/user/allUserList', controller.user.allUserList)

router.get('/user/getUserPage', controller.user.getUserPage)

router.post('/user/logOut', controller.user.logOut)

router.post('/user/updateUserface', uploadImg.single('fileName'), controller.user.updateUserface)

// 留言墙
router.post('/leaveWell/addLeave', controller.leaveWell.addLeave)

router.post('/leaveWell/deleteLeave', controller.leaveWell.deleteLeave)

router.get('/leaveWell/viewDetail', controller.leaveWell.viewDetail)

router.get('/leaveWell/allLeaveList', controller.leaveWell.allLeaveList)

// 标签管理
router.post('/tagControl/addPageState', controller.tag.addPageState)

router.get('/tagControl/allTagPage', controller.tag.allTagPage)

router.post('/tagControl/updateTagInfo', controller.tag.updateTagInfo)

router.post('/tagControl/deleteTag', controller.tag.deleteTag)

// 文章
router.post('/article/addArticle', controller.article.addArticle)

router.post('/article/uploadImg', uploadImg.single('fileName'), controller.article.articleImg)

router.get('/article/articleArchive', controller.article.articleArchive)

router.get('/article/articlePage', controller.article.articlePage)

router.get('/article/articleDetail', controller.article.articleDetail)

router.get('/article/searchArticle', controller.article.searchArticle)

router.get('/article/getHotArticle', controller.article.getHotArticle)

router.post('/article/deleteArticle', controller.article.deleteArticle)

router.post('/article/readArticle', controller.article.readArticle)

router.post('/article/praiseArticle', controller.article.praiseArticle)

// 面板
router.get('/panel/statistical', controller.panel.statistical)

router.get('/panel/submitArticle', controller.panel.submitArticle)

router.get('/panel/articleRead', controller.panel.articleRead)

router.get('/panel/getHotTag', controller.panel.getHotTag)

// 全局设置
router.post('/global/editGlobal', controller.global.editGlobal)
router.get('/global/detailGlobal', controller.global.detailGlobal)

// 评论控制
router.get('/comments/getCommentsList', controller.comments.commentsList)

router.get('/comments/getCommentsArticle', controller.comments.getCommentsArticle)

router.post('/comments/addComment', controller.comments.addComment)

router.post('/comments/commentsPraise', controller.comments.commentPraise)

router.post('/comments/deleteComment', controller.comments.deleteComment)

router.post('/comments/commentDetails', controller.comments.commentDetails)

router.post('/comments/commentPraise', controller.comments.commentPraise)

module.exports = router;
