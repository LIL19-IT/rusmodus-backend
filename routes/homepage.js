const express = require('express');
const router = express.Router();
const { homepage } = require('../controllers/homepage');

router.get('/', homepage);

module.exports = router;