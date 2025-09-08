const multer = require('multer');
const path = require('path');
const fs = require('fs');

const IMAGE_DIR = path.join(__dirname, '../public/images');
const VIDEO_DIR = path.join(__dirname, '../public/videos');

if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });
if (!fs.existsSync(VIDEO_DIR)) fs.mkdirSync(VIDEO_DIR, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, IMAGE_DIR);
        } else if (file.mimetype.startsWith('video/')) {
            cb(null, VIDEO_DIR);
        } else {
            cb(new Error('Only image and video files are allowed'), null);
        }
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, `${timestamp}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']; 
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/mov'];

    if (allowedImageTypes.includes(file.mimetype) || allowedVideoTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, SVG images and MP4, MOV, WEBM videos are allowed'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 200 * 1024 * 1024, 
    }
});

module.exports = {
    upload,
};
