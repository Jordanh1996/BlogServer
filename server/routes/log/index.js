const express = require('express');
const { authenticate } = require('../../middleware/authenticate');
const controller = require('./log.controller');

const router = express.Router();


router.post('/in', controller.LogIn);

router.delete('/out', authenticate, controller.LogOut);


module.exports = router;
