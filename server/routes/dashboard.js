const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user });
});

module.exports = router;
