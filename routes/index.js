const express = require('express');
const router = express.Router();
const article = require('./../model/article/index')
const controller = require('./../controller/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('this is Blog welcome in')
});

router.get('/initPage', controller.user.initPage);



module.exports = router;
