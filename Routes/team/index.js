const express = require('express');
const router = express.Router();
const { TokenVerification } = require('../../Middleware');
const getTeam = require('./getTeam');
const { body, param } = require('express-validator');
const { ValidationErrorHandler } = require('../../Handlers')
const { keywords, project } = require('../../Handlers/ErrorMessages')
const { ValidationObjectId } = require('../../Handlers')

// ROUTES * /api/team/


router.get('/:projectId', [
    TokenVerification,
    param('projectId').customSanitizer(ValidationObjectId)
], getTeam)



module.exports = router