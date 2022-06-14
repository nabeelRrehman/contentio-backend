const { removeDataArrWithFilters, findAll } = require('../../../Helpers')

const removeAuthor = async(req, res) => {

    const { user, projectId, keywordId, recommendedTitleId, keyword } = req.params
 
    try {

      let searchQuery = { 
        "project": projectId,
        "_id": keyword
      }
      let removeQuery = { "keywords.$[i].recommendedTitles.$[j].authors": user }
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
      await removeDataArrWithFilters('keyword', searchQuery, removeQuery, filterQuery)
      return res.status(200).send({ status: 200, success: 'Author successfully removed!' })

    } catch (e) {
        res.status(400).send({ status: 400, message: e.message })

    }
}

module.exports = removeAuthor