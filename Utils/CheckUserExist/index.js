const Models = require('../../Models')

const checkUserExist = (email) => {
    return new Promise((resolve, reject) => {
        Models.user.findOne({ email: email }).exec((err, user) => {
            if (err) {
                reject(err);
                return;
            }
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    })
}

module.exports = { checkUserExist: checkUserExist };
