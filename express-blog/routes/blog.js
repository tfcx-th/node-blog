var express = require('express');
var router = express.Router();
const loginCheck = require('../middleware/loginCheck');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog');

router.get('/list', (req, res, next) => {
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''
  if (!req.session.username) {
    // 未登录
    res.json(new ErrorModel('未登录'));
    return;
  }
  author = req.session.username;
  return getList(author, keyword).then(listData => res.json(new SuccessModel(listData)));
});

router.get('/detail', (req, res, next) =>  {
  const id = req.query.id;
  return getDetail(id).then(detailData => res.json(new SuccessModel(detailData)));
});

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  return newBlog(req.body).then(data => res.json(new SuccessModel(data)));
});

router.post('/update', loginCheck, (req, res, next) => {
  const id = req.query.id;
  return updateBlog(id, req.body).then(result => {
    if (result) {
      res.json(new SuccessModel());
    }
    res.json(new ErrorModel('update failed'));
  });
});

router.post('/del', loginCheck, (req, res, next) => {
  const author = req.session.username
  const id = req.query.id
  return deleteBlog(id, author).then(result => {
    if (result) {
      res.json(new SuccessModel());
    }
    res.json(new ErrorModel('update failed'));
  });
});

module.exports = router;
