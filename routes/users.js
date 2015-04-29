var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/guys', function (req, res, next) {
    res.send('guys');
});

router.get('/gals', function (req, res, next) {
    res.send('gals');
});

module.exports = router;
