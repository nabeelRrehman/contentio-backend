// const express = require('express');
// const router = express.Router();
// const { updateUserData, getDbUserData } = require('../../../Helpers')
// const nodemailer = require('nodemailer')
// const { email, password } = require('../../../Config/Nodemailer')
// const { AWSSecretKey, AWSAccessKeyId, BucketName } = require('../../../Config/AWS')
// const smtpPassword = require('aws-smtp-credentials');
// const sesTransport = require('nodemailer-ses-transport')

// const AWSID = AWSAccessKeyId;
// const SECRET = AWSSecretKey;


// // var smtpTransporter = nodemailer.createTransport({
// //     port: 465,
// //     host: 'email-smtp.us-east-1.amazonaws.com',
// //     secure: true,
// //     auth: {
// //         user: AWSID,
// //         pass: smtpPassword(SECRET),
// //     },
// //     debug: true
// // });

// var sesTransporter = nodemailer.createTransport(sesTransport({
//     accessKeyId: AWSID,
//     secretAccessKey: SECRET,
//     region: 'us-east-1'
// }));


// var ID = function() {
//     // Math.random should be unique because of its seeding algorithm.
//     // Convert it to base 36 (numbers + letters), and grab the first 9 characters
//     // after the decimal.
//     return (Math.random().toString(36).substr(2, 6)).toUpperCase();
// };



// const sendMail = async(UserEmail) => {

//     let code = ID()

//     let mailDetails = {
//         from: email,
//         to: UserEmail,
//         subject: 'Forget Password',
//         text: `
// You can reset your password by enter the code in app
        
// ${code}
//         `
//     };

//     let response = await sesTransporter.sendMail(mailDetails);
//     if (response) {
//         return code
//     }
// }




// const forgetPassword = async(req, res) => {

//     const { user_email } = req.body
//     let check_email = await getDbUserData('user', 'email', user_email)
//     if (check_email) {
//         let code = await sendMail(user_email)
//         if (code) {
//             let searchQuery = { "_id": check_email._id }
//             let updateQuery = { "verification_code": code }
//             await updateUserData('user', searchQuery, updateQuery)
//             res.status(200).send({ status: 200, success: 'Email sent!' })
//         }
//     } else {
//         res.status(404).send({ status: 404, message: 'Email does not exists!' })
//     }
// }


// const verifyPassword = async(req, res) => {

//     const { code, user_email } = req.body
//     let user = await getDbUserData('user', 'email', user_email)
//     if (user && user.verification_code) {
//         if (code == user.verification_code) {
//             res.status(200).send({ status: 200, success: 'Code Successfully Verified!', code })
//         } else {
//             res.status(400).send({ status: 400, message: 'Code is wrong' })
//         }
//     } else {
//         res.status(404).send({ status: 404, message: 'User/Code does not exists' })
//     }

// }


// router.post('/', forgetPassword)
// router.post('/verify', verifyPassword)


// module.exports = router