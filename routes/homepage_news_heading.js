const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const {
  list_page,
  create_page,
  add,
  edit_page,
  edit,
  remove
} = require('../controllers/homepage_news_heading');

router.get('/', auth, list_page);
router.get('/create', auth, create_page);
router.post('/create', auth, add);
router.get('/edit/:id', auth, edit_page);
router.post('/edit/:id', auth, edit);
router.post('/remove/:id', auth, remove);

module.exports = router;
