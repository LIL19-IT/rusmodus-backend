const router = require('express').Router({ mergeParams: true });
const {
  create_page,
  create,
  edit_page,
  edit,
  remove,
} = require('../controllers/advantages');
const { auth } = require('../middlewares/auth');

router.get('/create', create_page);
router.post('/create', create);

router.get('/edit/:id', edit_page);
router.post('/edit/:id', edit);


router.post('/remove/:id', remove);


module.exports = router;
