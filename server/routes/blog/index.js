const express = require('express');
const { authenticate } = require('../../middleware/authenticate');
const controller = require('./blog.controller');

const router = express.Router();


router.get('/:id', controller.getBlogById);

router.post('/get', controller.getBlogs);

router.post('/', authenticate, controller.createBlog);

router.delete('/:id', authenticate, controller.deleteBlogById);

router.patch('/:id', authenticate, controller.patchBlogById);

module.exports = router;
