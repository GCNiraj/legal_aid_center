const Application = require('./../models/applicationModel')
const AppError = require('../utils/appError')
const multer = require('multer')

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'archieve')
    },
    filename: (req, res, cb) => {
        var obj = JSON.parse(req.cookies.token)
        const ext = file.mimetype.split('/')[1]
        cb(null, `user-${obj['_id']}-{Date.now()}.${ext}`)
    }
})
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('video')) {
        cb(null, true)
    }else {
        cb(new AppError('Not an image! Please upload only images',400), false)
    }
}