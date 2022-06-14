const { updateSpecificData, findOneBySearch } = require('../../../Helpers')
const { deleteObjectFromBucket } = require('../../../Utils')


const updateProfile = async(req, res) => {

    const { userId } = req

    try {   
    
        const searchQuery = { "_id": userId }
        if(req.body.profileUrl) {
            let user = await findOneBySearch('user', searchQuery)
            if(user && user.profileUrl) {
                let split = user.profileUrl.split('/')
                let path = split.slice(split.length - 1)
                console.log("🚀 ~ file: index.js ~ line 16 ~ updateProfile ~ path", path)
                await deleteObjectFromBucket({ filename: path })
            }
        }
    
        await updateSpecificData('user', searchQuery, req.body)
        return res.status(200).send({ status: 200, success: 'User Updated Successfully!' });
    
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message })

    }
}

module.exports = updateProfile