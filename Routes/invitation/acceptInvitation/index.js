const { findOneBySearch, pushIfNotExists, updateSpecificData } = require('../../../Helpers')

const acceptInvitation = async(req, res) => {

    const { userId } = req
    const { inviteId } = req.params
    try {   

        let matchSearch = { "_id": inviteId }
        let invite = await findOneBySearch('invite', matchSearch)
        let user = await findOneBySearch('user', { "_id": userId })
        if (invite && invite.email === user.email) {
            
                let checkAccepted = await findOneBySearch('team', { "members": { "$in": userId }, "project": invite.project })
                if(checkAccepted){
                    return res.status(400).send({ status: 400, success: 'User already accepted!' });
                
                }else{
                    try {

                        let updateQuery = { "members": userId }
                        let searchProject = { "_id": invite.project }
                        let updateProject = { "team": userId }
                        
                        await updateSpecificData('invite', { "_id": inviteId }, { "status": 'accepted' })
                        await pushIfNotExists('team', { "project": invite.project }, updateQuery)
                        await pushIfNotExists('project', searchProject, updateProject)
                        return res.status(200).send({ status: 200, success: 'Invitation accepted!' });

                    }catch (e) {
                        console.log(e.message)
                    }

                }
            
        } else {
            // let getInvite = await getSpecificData('invite', '_id', inviteId)

            return res.status(400).send({ status: 400, success: `You're not invited` });
        }
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message })

    }
}

module.exports = acceptInvitation