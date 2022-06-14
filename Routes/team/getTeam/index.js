const { getSpecificPopulated, findOneBySearch } = require('../../../Helpers')
const qs = require('querystring')
const url = require('url')

const getTeam = async(req, res) => {
    let parsedUrl = url.parse(req.url);
    let parsedQs = qs.parse(parsedUrl.query);
    const { populate } = parsedQs
    const { projectId } = req.params 
    try { 
        let members = []  
        
        let searchQuery = { project: projectId }
        if (populate){
            let parsed = JSON.parse(populate)
            members = await getSpecificPopulated('team', searchQuery, parsed)
        
        } else{
            members = await findOneBySearch("team", searchQuery)
        
        }
        return res.status(200).send({ status: 200, members });
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message })

    }
}

module.exports = getTeam