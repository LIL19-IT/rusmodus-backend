const express = require('express');
const router = express.Router();
const { 
  getAllAquacultureContent, 
  createAquacultureContent,
  deleteAquacultureContent, 
  getAquacultureContentById, 
  updateAquacultureData, 
  updateCharacteristics 
} = require('../controllers/aquaculture_content');
const { auth } = require('../middlewares/auth');


router.get('/', auth, getAllAquacultureContent);
router.get('/detail/:id', auth, getAquacultureContentById);
router.post('/delete/:id', auth, deleteAquacultureContent);
router.post('/update/:id', auth, updateAquacultureData);
router.post("/characteristics/:id", auth, updateCharacteristics);
router.get('/create', (req, res) => {
  res.render('aquaculture_content/create', {
    title: 'Add New Aquaculture Content',
    user: req.session.user,
    layout: 'base',
    content: { characteristics: [] }
  });
});

router.post('/create', auth, createAquacultureContent);

module.exports = router;
