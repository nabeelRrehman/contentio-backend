var _ = require('underscore');

const ValidateConfirmPassword = (password,confirmPassword) => {
    const ConfirmPasswordCheck = _.isString(confirmPassword)
    if (ConfirmPasswordCheck) {
       if(password === confirmPassword){
        return true
       }
       return false
    }
}


module.exports = { ValidateConfirmPassword: ValidateConfirmPassword };
