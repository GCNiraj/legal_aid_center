const Application = require('./../models/applicationModel')
const AppError = require('../utils/appError')
const multer = require('multer')

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("In here first")
        cb(null, 'archieve/application_data')
    },
    filename: (req, res, cb) => {
        var obj = JSON.parse(req.cookies.token)
        console.log(obj)
        const ext = file.mimetype.split('/')[1]
        cb(null, `user-${obj['_id']}-${Date.now()}.${ext}`)
        console.log("here")
    }
})
const multerFilter = (req, file, cb) => {
    console.log("No way")
    if ((file.mimetype.startsWith('video')) === false)  {
        cb(null, true)
    }else {
        cb(new AppError('Not an valid document! Please do not upload videos',400), false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

const filterObj = (obj, ...allowedFields) => {
    const newObj = {}
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el]
    })
    return newObj
}


exports.uploadVerificationDocument = upload.single('verification_document')
exports.uploadFamilyTree = upload.single('family_tree')
exports.uploadHouseholdIncome = upload.single('householdincome_document')
exports.uploadHouseholddisposable = upload.single('householddisposable_document')
exports.uploadCaseDocument = upload.single('case_background')
exports.uploadDisabilityDocument = upload.single('disability_document')
exports.uploadAdditionalDocument = upload.single('additional_document')

exports.getAllApplications = async (req, res, next) => {
    try{
        const applications = await Application.find()
        res.status(200).json({data: applications, status: 'success'})
    }catch (err){
        res.status(500).json({error: err.message})
    }
}

exports.createApplication = async (req, res) => {
    try {

        const filteredBody = filterObj(req.body, 'registration_date','name','cid','dob','gender','occupation','number','email','current_address','permanent_address','institute_name','dealing_official','total_household_income','total_household_members','household_members','user')
        
        console.log(req)
        if (req.body.verification_document !== 'undefined'){
            filteredBody.verification_document = req.file.filename
        }
        if (req.body.family_tree !== 'undefined'){
            filteredBody.photo = req.file.filename
        }
        if (req.body.householdincome_document !== 'undefined'){
            filteredBody.photo = req.file.filename
        }
        if (req.body.householddisposable_document !== 'undefined'){
            filteredBody.photo = req.file.filename
        }
        if (req.body.case_background !== 'undefined'){
            filteredBody.photo = req.file.filename
        }
        if (req.body.disability_document !== 'undefined'){
            filteredBody.photo = req.file.filename
        }
        if (req.body.additional_document !== 'undefined'){
            filteredBody.photo = req.file.filename
        }

        const application = await Application.create(filteredBody)

        res.status(200).json({data: application, status: 'success'})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}