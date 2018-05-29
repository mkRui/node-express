const express = require('express');
const router = express.Router();
const article = require('./../model/article/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  article.addArticle('1', '1', '1').then((res) => {
    console.log(1)
    // console.log(res)
  }).catch((err) => {
    console.log(2)
    console.log(err)
  })
  res.send('indexs');
});

module.exports = router;
