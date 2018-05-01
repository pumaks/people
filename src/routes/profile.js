'use strict';

const express = require('express');
const router = express.Router();

const { uploadAvatarAjax, renderProfile } = require('../controllers/profile');

router.get('/', renderProfile);

router.post('/loadAvatar', uploadAvatarAjax);

module.exports = router;
