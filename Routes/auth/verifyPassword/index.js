const bcrypt = require("bcryptjs");
const { getSpecificData } = require("../../../Helpers");

const { checkUserExist } = require('../../../Utils')

const checkPassword = async(req, res) => {
    const { email, password } = req.body
    const isUserExist = await checkUserExist(email)
    if (!isUserExist) {
        return res.status(404).send({ status: 404, message: 'User not exist.' });
    }
    let user = await getSpecificData('user', "email", email)
    if (user && user.email) {
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(400).send({ status: 400, message: "Invalid Password!" });
        }
        res.status(200).send({ status: 200, success: 'Valid Password.' });
    }
}

module.exports = checkPassword