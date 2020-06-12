const multer = require('multer')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')

const dotenv = require('dotenv')
dotenv.config()

aws.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey
})


const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: multerS3({
        s3 : s3,
        bucket: 'clone-amazon',
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname})
        },
        key: (req, file, cb) =>  {
            cb(null, Date.now().toString())
        },
        fileFilter: fileFilter
    })
})

module.exports = upload;