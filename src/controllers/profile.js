'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

const AdditionalInfo = require('../models/additionalInfo');

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, './src/public/img/user-uploads/' + req.user._id),
  filename: (req, file, next) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) return next(err);
      next(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
});

const removeFile = filePath => fs.unlink('./' + filePath);

const uploadAvatarAjax = [
  multer({ storage }).single('avatar'),
  (req, res) => {
    if (!req.file) res.send({ err: 'error' });
    else res.send({ avatarPath: req.file.path });
    removeFile(req.body.oldPath);
    AdditionalInfo.findOneAndUpdate(
      { userId: req.user._id },
      { avatar: req.file.path },
    ).exec();
  }
];

const renderProfile = async(req, res) => {
  const additionalInfo = await AdditionalInfo.findOne(
    { userId: req.user._id },
    { userId: 0, _id: 0 }
  ).exec();
  const u = req.user;
  console.log(additionalInfo);
  // Object.assign(req.user, { h: 'l' });
  req.user.avatar = additionalInfo.avatar;
  res.render('profile', { title: 'Profile', user: req.user });
  console.log(req.user);
};

module.exports = {
  uploadAvatarAjax,
  renderProfile
};
