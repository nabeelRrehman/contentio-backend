const { updateDataWithFilters } = require('../../../Helpers')


const updateKeywordStatus = async(req, res) => {

    const { keyword, projectId, keywordId, status, recommendedTitleId } = req.body

    try {   
        
        let searchQuery = { 
            "project": projectId,
            "_id": keyword
        }
        let updateQuery = { "keywords.$[i].recommendedTitles.$[j].status": status }
        let filterQuery = {
            "arrayFilters": [
                {
                    "i._id": keywordId
                },
                {
                    "j._id": recommendedTitleId
                }
            ]
        }
        let update = await updateDataWithFilters('keyword', searchQuery, updateQuery, filterQuery)
        console.log("🚀 ~ file: index.js ~ line 26 ~ updateKeywordStatus ~ update", update)
        return res.status(200).send({ status: 200, success: 'Keyword Updated Successfully!' });
    
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message })

    }
}

module.exports = updateKeywordStatus