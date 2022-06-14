const { getSpecificPopulated, findOneBySearch } = require('../../../Helpers')
const qs = require('querystring')
const url = require('url')

const getProjectByID = async(req, res) => {
    let parsedUrl = url.parse(req.url);
    let parsedQs = qs.parse(parsedUrl.query);
    const { populate } = parsedQs
    // const { userId } = req
    const { projectId } = req.params
    try { 
        let project  
        let searchQuery = { "_id": projectId }
        
        if (populate){
            let parsed = JSON.parse(populate)
            project = await getSpecificPopulated('project', searchQuery, parsed)
        
        } else{
            project = await findOneBySearch("project", searchQuery)
        
        }
        return res.status(200).send({ status: 200, project });
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message })

    }
}

module.exports = getProjectByID