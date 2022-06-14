const { updateDataWithFilters } = require('../../../Helpers')


const updateKeywordTitles = async(req, res) => {

    const { projectId, keywordId, recommendedTitleId, title, keyword } = req.body

    try {   
        
        let searchQuery = { 
            "project": projectId, 
            "_id": keyword
        }
        let updateQuery = { "keywords.$[i].recommendedTitles.$[j].title": title }
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
        await updateDataWithFilters('keyword', searchQuery, updateQuery, filterQuery)
        return res.status(200).send({ status: 200, success: 'Recommended title Updated Successfully!' });
    
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message })

    }
}

module.exports = updateKeywordTitles