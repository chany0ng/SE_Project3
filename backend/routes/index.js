const express = require('express');
const path = require('path');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile(path.join(__dirname, '../public', 'index.html'))
});

// router.post('/', function(req, res, next) {
//   res.send('success');
// })


module.exports = router;
