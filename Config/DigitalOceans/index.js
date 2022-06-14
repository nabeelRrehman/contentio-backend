require('dotenv').config()

module.exports = {
    DigitalOceansSecretKey: process.env.DIGITAL_OCEANS_SECRET_KEY, 
    DigitalOceansAccessKeyId: process.env.DIGITAL_OCEANS_ACCESS_KEY_ID, 
    BucketName: process.env.DIGITAL_OCEANS_BUCKET_NAME,
    DigitalOceansEndpoint : process.env.DIGITAL_OCEANS_ENDPOINT
}
