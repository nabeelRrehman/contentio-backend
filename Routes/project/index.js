const express = require('express');
const router = express.Router();

const { body, param } = require('express-validator');

const createProject = require('./createProject')

const { TokenVerification } = require('../../Middleware')
const { ValidationErrorHandler } = require('../../Handlers');
const getProject = require('./getProject');
const getProjectByID = require('./getProjectByID');
const { ValidationObjectId } = require('../../Handlers')
// const { passwordIsNumber, passwordStrength, mobileNumber } = require('../../Handlers/ErrorMessages')

// ROUTES * /api/auth/

router.post('/', [
    //middlewares
    TokenVerification,
    body('title').exists(),
    body('description').exists(),
    ValidationErrorHandler
], createProject)

router.get('/', [
    //middlewares
    TokenVerification,
], getProject)

router.get('/:projectId', [
    //middlewares
    TokenVerification,
    param('projectId').customSanitizer(ValidationObjectId)
], getProjectByID)


module.exports = router