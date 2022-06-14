const { saveNewData, pushSpecificData, findOneBySearch } = require('../../../Helpers')
const sendMail = require('../../../Utils/sendMail')

const sendInvitation = async(req, res) => {

    const { userId } = req
    const { email, privateNote, projectId } = req.body

    let user = await findOneBySearch('user', { "email": email })
    if(user && user._id == userId) {
        return res.status(400).send({ status: 400, success: `You can't invite yourself!` });
    }

    try {   
        let obj = {
            email,
            user: userId,
            privateNote,
            project: projectId,
            status: 'pending',
        }
        
        let checkInvite = await findOneBySearch('invite', { "email": email, project: projectId })
        if(checkInvite) {
            return res.status(400).send({ status: 400, success: 'User already invited for this project!' });
        }
        let invite = await saveNewData('invite', obj)
        let link = `https://contentio-37f72.web.app/invitation/${invite._id}`
        await pushSpecificData('user', { "_id": userId }, { "invites": invite._id })
        await sendMail({ toEmail: email, link, privateNote })
        return res.status(200).send({ status: 200, success: 'invite sent!', invite });
    
    } catch (e) {
        res.status(400).send({ status: 400, message: e.message })

    }
}

module.exports = sendInvitation