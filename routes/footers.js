const express = require('express');
const router = express.Router();
const { footers } = require('../controllers/footers');

router.get('/', footers);

module.exports = router;