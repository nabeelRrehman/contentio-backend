const express = require('express');
const router = express.Router();
const { TokenVerification } = require('../../Middleware')
const getUserData = require('./getUser');


// ROUTES * /api/user/

router.get('/', [
    //middlewares
    TokenVerification,
], getUserData)


module.exports = router