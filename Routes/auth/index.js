const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

const login = require('./login')
const signUp = require('./signUp')
const updatePassword = require('./updatePassword')
const verifyPassword = require('./verifyPassword')
const forgetPassword = require('./forgetPassword')

const { TokenVerification } = require('../../Middleware')
const { ValidationErrorHandler } = require('../../Handlers')
const { passwordIsNumber, passwordStrength, passwordRequired } = require('../../Handlers/ErrorMessages');
const { syncPlans } = require('../../Middleware/Plan');

// ROUTES * /api/auth/

router.post('/login', [
    //middlewares
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty().withMessage(passwordRequired),
    ValidationErrorHandler
], login)

router.post('/register',[
    //middlewares
    syncPlans,
    body('email').isEmail().normalizeEmail(),
    body('firstName').not().isEmpty().trim().escape(),
    body('lastName').not().isEmpty().trim().escape(),
    body('password').isLength({ min: 6 })
    .withMessage(passwordStrength)
    .matches(/\d/)
    .withMessage(passwordIsNumber),
    ValidationErrorHandler
], signUp)

router.put('/password', [
    TokenVerification,
    body('new_password').isLength({ min: 6 })
    .withMessage(passwordStrength)
    .matches(/\d/)
    .withMessage(passwordIsNumber),
    ValidationErrorHandler
], updatePassword)

router.post('/verify', [
    TokenVerification,
    body('email').isEmail().normalizeEmail(),
    body('password').exists(),
    ValidationErrorHandler
], verifyPassword)



module.exports = router