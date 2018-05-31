const express = require('express');
const router = express.Router();
const controller = require('./../controller/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('this is Blog welcome in')
});

router.get('/initPage', controller.user.initPage);

router.post('/article/addArticle', controller.article.addArticle)



module.exports = router;
