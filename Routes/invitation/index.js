const express = require('express');
const router = express.Router();
const { TokenVerification } = require('../../Middleware');
const sendInvitation = require('./sendInvitation');
const acceptInvitation = require('./acceptInvitation');
const getInvitation = require('./getInviteDetail');
const getAllInvitation = require('./getAllInvitation');
const { body, param } = require('express-validator');
const { ValidationErrorHandler, ValidationObjectId } = require('../../Handlers')
const { email, privateNote } = require('../../Handlers/ErrorMessages')

// ROUTES * /api/invitation/

router.get('/project/:projectId', [
    TokenVerification,
    param('projectId').customSanitizer(ValidationObjectId),
    ValidationErrorHandler
], getAllInvitation)

router.get('/:inviteId', [
    TokenVerification,
    param('inviteId').customSanitizer(ValidationObjectId),
    ValidationErrorHandler
], getInvitation)

router.post('/', [
    TokenVerification,
    body('email').isEmail().normalizeEmail().withMessage(email),
    body('privateNote').notEmpty().withMessage(privateNote),
    body('projectId').customSanitizer(ValidationObjectId),
    ValidationErrorHandler
], sendInvitation)


router.put('/:inviteId', [
    TokenVerification,
    param('inviteId').customSanitizer(ValidationObjectId),
    ValidationErrorHandler
], acceptInvitation)


module.exports = router