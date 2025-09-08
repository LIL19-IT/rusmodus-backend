const express = require('express');
const router = express.Router();
const { procurement } = require('../controllers/procurement');

router.get('/', procurement);

module.exports = router;