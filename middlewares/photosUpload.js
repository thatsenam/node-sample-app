const multer= require('multer')
const crypto = require('crypto')
const path= require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './photos/')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null,crypto.randomBytes(16).toString('hex')+path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})
module.exports =  upload.array("photo") 