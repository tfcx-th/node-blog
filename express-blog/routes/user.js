var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { login } = require('../controller/user');

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  return login(username, password).then(data => {
    if (data.user_name) {
      // set session
      req.session.username = data.user_name;
      req.session.realName = data.user_real_name;
      res.json(new SuccessModel());
      return;
    }
    res.json(new ErrorModel('login failed'));
  });
});

router.get('/login-test', (req, res, next) => {
  if (req.session.username) {
    res.json({
      errno: 0,
      msg: 'success'
    });
    return;
  }
  res.json({
    errno: -1,
    msg: 'fail'
  });
})

module.exports = router;
