const express = require('express');
const router = express.Router();
const { farmanimals } = require('../controllers/farmanimals');

router.get('/', farmanimals);

module.exports = router;