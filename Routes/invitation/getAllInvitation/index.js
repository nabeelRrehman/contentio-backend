const { findAll, getPopulated } = require('../../../Helpers')
const qs = require('querystring')
const url = require('url')

const getAllInvitation = async(req, res) => {
    let parsedUrl = url.parse(req.url);
    let parsedQs = qs.parse(parsedUrl.query);
    const { populate } = parsedQs
    const { userId } = req
    const { projectId } = req.params
    
    try { 
        
        let invites
        let searchQuery = { "user": userId, project: projectId, status: 'pending' }
        if (populate){
        
            let parsed = JSON.parse(populate)
            invites = await getPopulated('invite', searchQuery, parsed)
                
        } else{
            invites = await findAll("invite", searchQuery)
        }
        return res.status(200).send({ status: 200, invites });
                
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message })

    }
}

module.exports = getAllInvitation