const express = require('express');
const router = express.Router();
const { TokenVerification } = require('../../Middleware');
const makeAuthor = require('./makeAuthor');
const removeAuthor = require('./removeAuthor');
const { body, param } = require('express-validator');
const { ValidationErrorHandler, ValidationObjectId } = require('../../Handlers')
const { emptyAuthor } = require('../../Handlers/ErrorMessages')

// ROUTES * /api/author

router.post('/', [
    TokenVerification,
    body('author').isArray().not()
    .isEmpty().withMessage(emptyAuthor),
    body('projectId').customSanitizer(ValidationObjectId),
    body('keywordId').customSanitizer(ValidationObjectId),
    param('keyword').customSanitizer(ValidationObjectId),
    body('recommendedTitleId').customSanitizer(ValidationObjectId),
    ValidationErrorHandler
], makeAuthor)

router.delete('/:user/project/:projectId/:keyword/:keywordId/:recommendedTitle/:recommendedTitleId/keywordMain/:keyword', [
    TokenVerification,
    param('user').customSanitizer(ValidationObjectId),
    param('projectId').customSanitizer(ValidationObjectId),
    param('keywordId').customSanitizer(ValidationObjectId),
    param('keyword').customSanitizer(ValidationObjectId),
    param('recommendedTitleId').customSanitizer(ValidationObjectId),
    ValidationErrorHandler
], removeAuthor)

module.exports = router