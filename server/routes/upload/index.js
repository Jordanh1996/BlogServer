const express = require('express');
const controller = require('./upload.controller');
const { authenticate } = require('../../middleware/authenticate');

const router = express.Router();

router.get('/', authenticate, controller.getSignedUrl);

router.delete('/delete', authenticate, controller.deleteObject);

module.exports = router;
