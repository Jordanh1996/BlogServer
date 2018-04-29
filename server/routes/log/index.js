const express = require('express');
const { authenticate } = require('../../middleware/authenticate');
const controller = require('./log.controller');
const { cleanTokenCache } = require('../../middleware/cleanCache');

const router = express.Router();


router.post('/in', controller.LogIn);

router.delete('/out', authenticate, cleanTokenCache, controller.LogOut);


module.exports = router;
