const express = require('express');
const router = express.Router();
const putObject = require('./putObject')
const UploadFile = require('./uploadFile')
const removeObject = require('./removeObject')
const getObject = require('./getObject')
const { TokenVerification } = require('../../Middleware')
const { ValidationErrorHandler } = require('../../Handlers')
const { fileNameError } = require('../../Handlers/ErrorMessages')
let { query, param } = require('express-validator')


router.post('/', [
    TokenVerification
], putObject)
router.delete('/:filename', [
    // TokenVerification,
    param('filename', fileNameError).exists(),
    ValidationErrorHandler,
], removeObject)
router.post('/file', UploadFile)
router.get('/', [
    // TokenVerification,
    query('name', fileNameError).exists(),
    ValidationErrorHandler,
], getObject)



module.exports = router