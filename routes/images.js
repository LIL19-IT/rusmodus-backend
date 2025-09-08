const express = require('express');
const router = express.Router();
const { get_images, upload_images, delete_images, list_media } = require('../controllers/images');
const { auth } = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');

router.get('/', auth, get_images);
router.post('/upload', auth, upload.single('file'), upload_images);
router.post('/delete', auth, delete_images);


router.get('/list', auth, list_media);



module.exports = router;
