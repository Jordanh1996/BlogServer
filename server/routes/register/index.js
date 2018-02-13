var express = require('express')
var router = express.Router()

const controller = require('./register.controller');
const {authenticate, ccc} = require('../../middleware/authenticate');


router.post('/', ccc, controller.Register);

router.get('/:username', ccc, controller.CheckUsername)

router.post('/emailcheck', ccc, controller.CheckEmail)


module.exports = router