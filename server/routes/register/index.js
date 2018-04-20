const express = require('express');
const controller = require('./register.controller');

const router = express.Router();


router.post('/', controller.Register);

router.get('/:username', controller.CheckUsername);

router.post('/emailcheck', controller.CheckEmail);


module.exports = router;
