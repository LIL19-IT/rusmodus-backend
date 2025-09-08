const express = require('express');
const router = express.Router();
const { contacts } = require('../controllers/contacts');

router.get('/', contacts);

module.exports = router;