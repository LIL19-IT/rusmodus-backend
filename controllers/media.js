const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = path.join(__dirname, '../public/media');

const get_media = (req, res) => {
  const user = req.session.user;
  const imageExts = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.bmp', '.webp'];
  const videoExts = ['.mp4', '.webm', '.mov'];

  let files = fs.readdirSync(UPLOAD_DIR);

  const media = files.map(file => {
    const ext = path.extname(file).toLowerCase();
    const filePath = path.join(UPLOAD_DIR, file);
    const stats = fs.statSync(filePath);

    return {
      name: file,
      type: imageExts.includes(ext) ? 'image' : videoExts.includes(ext) ? 'video' : 'other',
      mtime: stats.mtime.getTime()
    };
  }).filter(m => m.type !== 'other')
    .sort((a, b) => b.mtime - a.mtime); 

  res.render('media/gallery', {
    media, user, title: 'Media Gallery', active: 'media',
  });
};

const upload_media = (req, res) => {
  res.redirect('/media');
};

const delete_media = async (req, res) => {
  const { filename } = req.body;
  const file_path = path.join(UPLOAD_DIR, filename);

  if (fs.existsSync(file_path)) {
    fs.unlinkSync(file_path);
  }

  res.redirect('/media');
};

module.exports = {
  get_media,
  upload_media,
  delete_media,
};