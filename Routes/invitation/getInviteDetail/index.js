const { getSpecificPopulated, findOneBySearch } = require('../../../Helpers')
const qs = require('querystring')
const url = require('url')

const getInvitation = async(req, res) => {
    let parsedUrl = url.parse(req.url);
    let parsedQs = qs.parse(parsedUrl.query);
    const { populate } = parsedQs
    const { userId } = req
    const { inviteId } = req.params
    try { 
        
        let searchQuery = { "_id": inviteId }
        
        let user = await findOneBySearch('user', { "_id": userId })
        let invitedUser = await findOneBySearch('invite', searchQuery)
        if(invitedUser) {
            if(user.email === invitedUser.email) {
                let invite
                if (populate){
        
                    let parsed = JSON.parse(populate)
                    invite = await getSpecificPopulated('invite', searchQuery, parsed)
                
                } else{
                    invite = await findOneBySearch("invite", searchQuery)
                }
                return res.status(200).send({ status: 200, invite });
                
            } else {
                res.status(400).send({ status: 400, message: 'User not invited!' })

            }
        }
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message })

    }
}

module.exports = getInvitation