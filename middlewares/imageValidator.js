const fs =require("fs")

module.exports = (req, res, next) => {
    if (typeof (req.file) === 'undefined' ) {
        return res.status(400).json({
            errors: 'please send the image !'
        })
    }
    let name  = req.file.filename
    let path = req.file.path


    if (!(req.file.mimetype).includes('jpeg') && !(req.file.mimetype).includes('png') && !(req.file.mimetype).includes('jpg')) {
        fs.unlinkSync(req.file.path)
        return res.status(400).json({
            errors: "file not support"
        })
    }

    if (req.file.size > 1024 * 1024 * 2) {
        fs.unlinkSync(req.file.path)
        return res.status(400).json({
            errors: "File is Too large"
        })
    }

    if (!name || !path) {

        return res.status(400).json({
            sucess: false,
            message: "all fields are required"
        })
    }

    next()
}