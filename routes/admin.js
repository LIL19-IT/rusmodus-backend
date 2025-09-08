const express = require('express');
const router = express.Router();
const { admin } = require('../controllers/admin');
const { auth } = require('../middlewares/auth');

router.get('/', auth, admin);

module.exports = router;
