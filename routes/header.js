const express = require('express');
const router = express.Router();
const { header } = require('../controllers/header');

router.get('/', header);

module.exports = router;