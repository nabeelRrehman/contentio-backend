const { findAll, getPopulated } = require('../../../Helpers')
const qs = require('querystring')
const url = require('url')

const getProject = async(req, res) => {
    let parsedUrl = url.parse(req.url);
    let parsedQs = qs.parse(parsedUrl.query);
    const { populate } = parsedQs
    const { userId } = req
    try { 
        let projects = []  
        
        let searchQuery = { 
            "$or": [
                {
                    "team": { "$in": userId }
                },
                {
                    "user": userId
                }
            ] 
        }
        if (populate){
            let parsed = JSON.parse(populate)
            projects = await getPopulated('project', searchQuery, parsed)
        
        } else{
            projects = await findAll("project", searchQuery)
        
        }
        return res.status(200).send({ status: 200, projects });
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message })

    }
}

module.exports = getProject