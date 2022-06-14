var path = require('path')
const AWS = require('aws-sdk');
const { 
    DigitalOceansSecretKey, 
    DigitalOceansAccessKeyId, 
    BucketName,
    DigitalOceansEndpoint 
} = require('../../../Config/DigitalOceans')
var multer = require('multer')
const multerS3 = require('multer-s3');


const spacesEndpoint = new AWS.Endpoint(DigitalOceansEndpoint);

const ID = DigitalOceansAccessKeyId;
const SECRET = DigitalOceansSecretKey;

// The name of the bucket that you have created
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: ID,
    secretAccessKey: SECRET,
    Bucket: BucketName,
});

/**
 * Single Upload
 */
const profileImgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: BucketName,
        acl: 'public-read',
        key: function(req, file, cb) {
            // console.log("file", file)
            cb(null, `images/${path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname )}`)
        }
    }),
    limits: { fileSize: 20000000 }, // In bytes: 20000000 bytes = 20 MB
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image')




/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}


const upload_object = async(req, res) => {
    await profileImgUpload(req, res, async(error) => {
        console.log("error", error)
        if (error) {
            res.status(400).json({ status: 400, message: error });
        } else {
            // If File not found
            if (req.file === undefined) {
                console.log('Error: No File Selected!');
                res.status(404).json({ status: 404, message: 'File not found!' });
            } else {
                // If Success
                let imageLocation = req.file.location;
                // let split = imageLocation.split('/')
                // let path = split.slice(split.length - 1)
                res.status(200).send({ status: 200, location: imageLocation })

            }
        }
    });
};

module.exports = upload_object