const { saveNewData } = require('../../../Helpers')

const createProject = async(req, res) => {

    const { userId } = req

    try {   
        let project = await saveNewData('project', { ...req.body, user: userId })
        let teamObj = {
            project: project._id,
            user: userId
        }
        await saveNewData('team', teamObj)
        return res.status(200).send({ status: 200, project });
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message })

    }
}

module.exports = createProject