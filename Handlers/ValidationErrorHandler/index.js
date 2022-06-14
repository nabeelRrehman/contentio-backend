let { validationResult } = require('express-validator')

const ValidationErrorHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ status: 400, message: errors.array()[0].msg });
    }
    next()
};

module.exports = { ValidationErrorHandler: ValidationErrorHandler };