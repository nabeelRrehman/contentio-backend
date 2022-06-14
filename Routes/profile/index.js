const express = require('express');
const router = express.Router();

const { body, param } = require('express-validator');

const updateProfile = require('./updateProfile')
const { TokenVerification } = require('../../Middleware')
const { ValidationErrorHandler } = require('../../Handlers');
const { ValidationObjectId } = require('../../Handlers')
const { firstNameError, lastNameError } = require('../../Handlers/ErrorMessages')

// ROUTES * /api/profile/

router.put('/', [
    //middlewares
    TokenVerification,
    body('firstName').exists().withMessage(firstNameError),
    body('lastName').exists().withMessage(lastNameError),
    ValidationErrorHandler
], updateProfile)


module.exports = router