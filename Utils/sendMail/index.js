const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = require('../../Config/SendGrid')


sgMail.setApiKey(SENDGRID_API_KEY);


const sendMail = ({ toEmail, link, privateNote }) => {
    
    const msg = {
        to: toEmail,
        from: 'nabeelshahid2@gmail.com', // Use the email address or domain you verified above
        subject: 'PROJECT INVITATION',
        text: privateNote,
        html: `<strong>Click below link to accept invitation</strong><br /><br /><a target={'_blank'} href=${link}>${link}</a>`,
    };


    (async () => {
        try {
          await sgMail.send(msg);
        } catch (error) {
          console.error(error);
      
          if (error.response) {
            console.error(error.response.body)
          }
        }
      })();
}

module.exports = sendMail