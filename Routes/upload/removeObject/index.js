const { deleteObjectFromBucket } = require("../../../Utils")


const removeObject = async (req, res) => {
    const { filename } = req.params

    try {

        let response = await deleteObjectFromBucket({ filename })
        if (response.success) {
            res.status(200).send({ status: 200, message: response.success })        
        } else {
            res.status(400).send({ status: 400, message: response.error })
        }

    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }
}

module.exports = removeObject