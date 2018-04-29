const express = require('express');
const controller = require('./message.controller');
const { authenticate } = require('../../middleware/authenticate');

const router = express.Router();

router.post('/', authenticate, controller.addMessage);

module.exports = router;
