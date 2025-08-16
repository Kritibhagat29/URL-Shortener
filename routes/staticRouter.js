const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index'); // will look for views/index.ejs
});

module.exports = router;
