const { findOneBySearch } = require('../../../Helpers')

const getProject = async(req, res) => {
    const { userId } = req
    try { 
        let searchQuery = { "_id": userId }
        let user = await findOneBySearch('user', searchQuery)
        return res.status(200).send({ status: 200, user });
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message })

    }
}

module.exports = getProject