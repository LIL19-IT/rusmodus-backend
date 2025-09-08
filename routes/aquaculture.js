const express = require('express');
const router = express.Router();
const { aquaculture } = require('../controllers/aquaculture');

router.get('/', aquaculture);

module.exports = router;