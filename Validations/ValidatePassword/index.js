var _ = require('underscore');

const ValidatePassword = (para) => {
    const PasswordCheck = _.isString(para)
    if (PasswordCheck) {
        const rgx = /^[0-9A-Za-z]{6,50}$/;
        return rgx.test(para)
    }
}


module.exports = { ValidatePassword: ValidatePassword };
