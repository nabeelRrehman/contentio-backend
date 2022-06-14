const AWS = require('aws-sdk');
const { 
    DigitalOceansSecretKey, 
    DigitalOceansAccessKeyId, 
    BucketName,
    DigitalOceansEndpoint 
} = require('../../Config/DigitalOceans')

const spacesEndpoint = new AWS.Endpoint(DigitalOceansEndpoint);

const ID = DigitalOceansAccessKeyId;
const SECRET = DigitalOceansSecretKey;

// The name of the bucket that you have created
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: ID,
    secretAccessKey: SECRET,
});


const deleteObjectFromBucket = async ({ filename }) => {
    const params = {
        Key: `images/${filename}`, //if any sub folder-> path/of/the/folder.ext
        Bucket: BucketName,
    }

    try {
        await s3.headObject(params).promise()

        try {
            await s3.deleteObject(params).promise()
            return { success: 'File deleted Successfully!'}
        }
        catch (err) {
            return { error: err.message }
        }

    } catch (err) {
        return { error: err.message }
    }
}

module.exports = { deleteObjectFromBucket }