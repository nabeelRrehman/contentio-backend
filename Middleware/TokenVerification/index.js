const jwt = require("jsonwebtoken");
const Config = require("../../Config");


const TokenVerification = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(404).send({ status: 404, message: 'Authorization Bearer not found!' });
            } else {
                req.jwt = jwt.verify(authorization[1], Config.secret, (err, decoded) => {
                    if (err) {
                        return res.status(401).send({ status: 401, message: "Token Unauthorized!" });
                    }
                    req.userId = decoded.id;
                    next();
                });
            }
        } catch (err) {
            return res.status(403).send({ status: 403, message: err.message });
        }
    } else {
        return res.status(404).send({ status: 404, message: 'No Authorization found!' });
    }
};

module.exports = { TokenVerification: TokenVerification };