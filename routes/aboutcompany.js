const express = require('express');
const router = express.Router();
const { aboutcompany } = require('../controllers/aboutcompany');

router.get('/', aboutcompany);

module.exports = router;