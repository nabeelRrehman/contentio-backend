var _ = require('underscore');


const ValidateString = (param) => {
    const StringCheck = _.isString(param)
    if (StringCheck) {
        const rgx = /^[A-Za-z]+(?:[ ][A-Za-z]+)*$/;
        return rgx.test(param)
    }
}

module.exports = { ValidateString: ValidateString };