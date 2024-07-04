// routes/brand.js

const express = require('express');
const router = express.Router();
const Brand = require('../models/brand');

// Route to fetch all brands
router.get('/brands', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.render('index', { brands });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching brands');
  }
});

module.exports = router;
