const multer = require('multer')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')

aws.config.update({
    accessKeyId: 'AKIAIJRIVEZLXCQQ4P4A',
    secretAccessKey: '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'
})

const s3 = new aws.S3();


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
        }
    })
})

module.exports = upload;