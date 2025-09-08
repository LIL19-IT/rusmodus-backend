const router = require('express').Router({ mergeParams: true });
const {
  create_page,
  add,
  edit_page,
  edit,
  remove,
} = require('../controllers/positions');
const { auth } = require('../middlewares/auth');

router.get('/create', auth, create_page);
router.post('/create', auth, add);

router.get('/edit/:id', auth, edit_page);
router.post('/edit/:id', auth, edit);


router.post('/remove/:id', remove);


module.exports = router;
