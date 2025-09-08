const express = require('express');
const router = express.Router();
const { 
  getAllFarmAnimalsContent, 
  createFarmAnimalContent,
  deleteFarmAnimalContent, 
  getFarmAnimalContentById, 
  updateData, 
  updateCharacteristics 
} = require('../controllers/farmanimals_content');
const { auth } = require('../middlewares/auth');

router.get('/', auth, getAllFarmAnimalsContent);
router.get('/detail/:id', auth, getFarmAnimalContentById);
router.post('/delete/:id', auth, deleteFarmAnimalContent);
router.post('/update/:id', auth, updateData);

router.post("/characteristics/:id", auth, updateCharacteristics);

router.get('/create', (req, res) => {
  res.render('farmanimals_content/create', {
    title: 'Add New Farm Animal Content',
    user: req.session.user,
    layout: 'base',
    content: { characteristics: [] }
  });
});

router.post('/create', auth, createFarmAnimalContent);

module.exports = router;
