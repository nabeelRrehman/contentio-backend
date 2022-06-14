const express = require('express');
const router = express.Router();
const { TokenVerification } = require('../../Middleware');
const createASource = require('./createASource');
const updateCustomer = require('./updateCustomer');
const createToken = require('./createToken');
const { ValidationErrorHandler } = require('../../Handlers');
const { body } = require('express-validator');

// ROUTES * /api/payment/

router.post('/token', createToken)
router.put('/',[
    TokenVerification,
    body('tokenId').exists(),
    body('nameOnCard').exists(),
    ValidationErrorHandler
], updateCustomer)
router.post('/card',[TokenVerification], createASource)



module.exports = router