const express = require('express');
const router = express.Router();
const { pets } = require('../controllers/pets');

router.get('/', pets);

module.exports = router;