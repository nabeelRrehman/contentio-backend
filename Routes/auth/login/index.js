const bcrypt = require("bcryptjs");
const Config = require("../../../Config");
const jwt = require("jsonwebtoken");
const { getSpecificData } = require('../../../Helpers')
const { objectsHaveSameKeys } = require('../../../Utils')

const login = async(req, res) => {
    const { email, password } = req.body

    let requestBody = ['email', 'password']
    let requestObj = await objectsHaveSameKeys(requestBody, req.body)
    if (!requestObj) res.status(404).send({ status: 404, message: 'Missing parameters' })
    try {
        let user = await getSpecificData('user', "email", email)
        if (user) {
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) {
                return res.status(404).send({ status: 400, message: "Invalid Email or Password!" });
            }
            user.password = undefined;
            var token = jwt.sign({ id: user._id }, Config.secret);
            res.status(200).send({ status: 200, user, token })
        } else {
            return res.status(404).send({ status: 404, message: "User does not exist!" });
        }
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message })

    }
}

module.exports = login