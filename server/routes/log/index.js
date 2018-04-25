const express = require('express');
const { authenticate } = require('../../middleware/authenticate');
const controller = require('./log.controller');
const cleanCache = require('../../middleware/cleanCache');

const router = express.Router();


router.post('/in', controller.LogIn);

router.delete('/out', authenticate, cleanCache(), controller.LogOut);


module.exports = router;
