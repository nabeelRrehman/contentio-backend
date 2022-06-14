const AWS = require('aws-sdk');
const { 
    DigitalOceansAccessKeyId, 
    DigitalOceansEndpoint, 
    DigitalOceansSecretKey,
    BucketName,
} = require('../../../Config/DigitalOceans')
const qs = require('querystring')
const url = require('url')

const ID = DigitalOceansAccessKeyId;
const SECRET = DigitalOceansSecretKey;

const spacesEndpoint = new AWS.Endpoint(DigitalOceansEndpoint);

// The name of the bucket that you have created
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: ID,
    secretAccessKey: SECRET,
    Bucket: BucketName,
});

const get_object = async(req, res) => {

    let parsedUrl = url.parse(req.url);
    let parsedQs = qs.parse(parsedUrl.query);
    const { name } = parsedQs
    var params = { Bucket: BucketName, Key: `documents/${name}`, Expires: 120 };
    var paramHeads = { Bucket: BucketName, Key: `documents/${name}` };
    
    s3.headObject(paramHeads, (err, metadata) => {
        if (err && err.code === 'NotFound') {

            res.status(404).send({ status: 404, message: "Document not found!" })

        } else {

            var imageUrl = s3.getSignedUrlPromise('getObject', params);
            imageUrl.then((response) => res.status(200).send({ status: 200, url: response, expiresIn: 120 }))
                .catch((err) => res.status(400).send({ status: 400, message: err.message }))
            
        }
    })

}

module.exports = get_object