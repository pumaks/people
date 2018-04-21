'use strict';

const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './src/public/img/uploads'),
  filename: (req, file, next) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) return next(err);
      next(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
});

const upload = multer({ storage });

module.exports = upload;
