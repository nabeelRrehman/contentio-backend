const {ObjectID} = require('../../Types')
 
const ValidationObjectId = (value, {req}) => {
    try{
        return ObjectID(value)
    }catch(e){
        req.res.status(400).send({status: 400, message: e.message})
    }
}

module.exports = { ValidationObjectId: ValidationObjectId };