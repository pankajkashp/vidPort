// server/routes/testimonials.js
const express = require('express');
const router = express.Router();
const testimonialsJson = require('../../client/src/data/testimonials.json');

router.get('/', (req, res) => {
  res.json({ success: true, data: testimonialsJson });
});

module.exports = router;
