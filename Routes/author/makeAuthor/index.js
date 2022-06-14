const { findAll, updateDataWithFilters } = require('../../../Helpers')

const makeAuthor = async(req, res) => {

    const { userId } = req
    const { author, projectId, keywordId, recommendedTitleId, keyword } = req.body
 
    try {   

      let searchQuery = { 
        "project": projectId,
        "_id": keyword
      }
      let updateQuery = { "keywords.$[i].recommendedTitles.$[j].authors": author }
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
      let keywords = await findAll('keyword', { "user": userId })
      return res.status(200).send({ status: 200, keywords })
        
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message })

    }
}

module.exports = makeAuthor