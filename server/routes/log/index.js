var express = require('express');
var router = express.Router()

const {authenticate, ccc} = require('../../middleware/authenticate');
const controller = require('./log.controller');


router.post('/in', ccc, controller.LogIn)

router.delete('/out', authenticate, controller.LogOut)


module.exports = router