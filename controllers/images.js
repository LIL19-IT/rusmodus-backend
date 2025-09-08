const fs = require('fs');
const path = require('path');

const IMAGE_DIR = path.join(__dirname, '../public/images');
const VIDEO_DIR = path.join(__dirname, '../public/videos');

const allowedImageExt = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.bmp', '.webp'];
const allowedVideoExt = ['.mp4', '.mov', '.webm'];

const get_images = (req, res) => {
  const user = req.session.user;

  const imageFiles = fs.existsSync(IMAGE_DIR) ? fs.readdirSync(IMAGE_DIR) : [];
  const videoFiles = fs.existsSync(VIDEO_DIR) ? fs.readdirSync(VIDEO_DIR) : [];

  const images = imageFiles.filter(file =>
    allowedImageExt.includes(path.extname(file).toLowerCase())
  );

  const videos = videoFiles.filter(file =>
    allowedVideoExt.includes(path.extname(file).toLowerCase())
  );

  res.render('images/images', {
    images,
    videos,
    user,
    title: 'Uploaded Media',
    layout: 'base',
  });
};

const upload_images = (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded or invalid file type.');
  }
  res.redirect('/admin/images');
};

const delete_images = (req, res) => {
  const { filename, type } = req.body;

  if (!filename || !type) {
    return res.status(400).send('Missing filename or type');
  }

  const dir = type === 'video' ? VIDEO_DIR : IMAGE_DIR;
  const file_path = path.join(dir, filename);

  try {
    if (fs.existsSync(file_path)) {
      fs.unlinkSync(file_path);
    }
    res.redirect('/admin/images');
  } catch (err) {
    console.error('Failed to delete file:', err);
    res.status(500).send('Error deleting the file');
  }
};

const list_media = (req, res) => {
  const imageFiles = fs.existsSync(IMAGE_DIR) ? fs.readdirSync(IMAGE_DIR) : [];
  const videoFiles = fs.existsSync(VIDEO_DIR) ? fs.readdirSync(VIDEO_DIR) : [];

  const images = imageFiles.filter(file =>
    allowedImageExt.includes(path.extname(file).toLowerCase())
  );

  const videos = videoFiles.filter(file =>
    allowedVideoExt.includes(path.extname(file).toLowerCase())
  );

  res.json({ images, videos });
};

module.exports = {
  get_images,
  upload_images,
  delete_images,             
  list_media
};
