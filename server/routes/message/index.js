const express = require('express');
const controller = require('./message.controller');
const { authenticate } = require('../../middleware/authenticate');

const router = express.Router();

router.get('/username/:username', controller.getMessagesByUsername);

router.get('/blog/:blogid', controller.getMessagesByBlogId);

router.post('/', authenticate, controller.addMessage);

router.delete('/remove/:id', authenticate, controller.removeMessage);

router.patch('/update/:id', authenticate, controller.updateMessage);

module.exports = router;
