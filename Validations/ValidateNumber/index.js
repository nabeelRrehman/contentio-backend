var _ = require('underscore');

const ValidateNumber = (para) => {
    const NumberCheck = _.isString(para)
    if (NumberCheck) {
        const rgx = /^[0-9]{11}$/;
        return rgx.test(para)
    }
}

module.exports = { ValidateNumber: ValidateNumber };
