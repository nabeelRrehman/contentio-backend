const { findAll, getPopulated } = require('../../../Helpers')
const qs = require('querystring')
const url = require('url')

const getKeywords = async(req, res) => {
    let parsedUrl = url.parse(req.url);
    let parsedQs = qs.parse(parsedUrl.query);
    const { populate } = parsedQs
    const { userId } = req
    const { projectId } = req.params 
    try { 
        let keywords = []  
        
        let searchQuery = { "user": userId, "project": projectId }
        if (populate){
            let parsed = JSON.parse(populate)
            keywords = await getPopulated('keyword', searchQuery, parsed)
        
        } else{
            keywords = await findAll("keyword", searchQuery)
        
        }
        return res.status(200).send({ status: 200, keywords });
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message })

    }
}

module.exports = getKeywords