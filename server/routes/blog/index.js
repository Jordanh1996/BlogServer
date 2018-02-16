
const {authenticate, ccc} = require('../../middleware/authenticate');
const controller = require('./blog.controller')
var express = require('express');
var router = express.Router()


router.get('/:id', ccc, controller.getBlogById)

router.get('/username/:id', ccc, controller.getBlogsByUsername)

router.get('/title/:id', ccc, controller.getBlogsByTitle)

router.post('/get', ccc, controller.getBlogs)

router.post('/', authenticate, controller.createBlog)

router.delete('/:id', authenticate, controller.deleteBlogById)

router.patch('/:id', authenticate, controller.patchBlogById)

module.exports = router