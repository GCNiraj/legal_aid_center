const Application = require('./../models/applicationModel')
const AppError = require('../utils/appError')
const multer = require('multer')

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'archieve/application_data')
    },
    filename: (req, file, cb) => {
        // var obj = JSON.parse(req.cookies.token)
        const ext = file.mimetype.split('/')[1]
        // cb(null, `user-${obj['_id']}-${Date.now()}.${ext}`)
        cb(null, `user-${req.user.id}-${file.fieldname}-${Date.now()}.${ext}`)
    }
})
const multerFilter = (req, file, cb) => {
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

exports.uploadVerificationDocument = upload.any('verification_document')

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
        req.body.current_address = [{"current_village":req.body.current_village,"current_gewog":req.body.current_gewog,"current_dzongkhag":req.body.current_dzongkhag}]
        req.body.permanent_address = [{"permanent_village":req.body.permanent_village,"permanent_gewog":req.body.permanent_gewog,"permanent_dzongkhag":req.body.permanent_dzongkhag}]
        const filteredBody = filterObj(req.body, 'registration_date','name','cid','dob','gender','occupation','number','email','current_address','permanent_address','institute_name','dealing_official','total_household_income','total_household_member','household_members','user')

        console.log(req)
        if (req.body.verification_document !== 'undefined'){
            filteredBody.verification_document = req.files[0].filename
        }
        if (req.body.family_tree !== 'undefined'){
            filteredBody.family_tree = req.files[1].filename
        }
        if (req.body.householdincome_document !== 'undefined'){
            filteredBody.householdincome_document = req.files[2].filename
        }
        if (req.body.householddisposable_document !== 'undefined'){
            filteredBody.householddisposable_document = req.files[3].filename
        }
        if (req.body.case_background !== 'undefined'){
            filteredBody.case_background = req.files[4].filename
        }
        if (req.files.length>5 && req.files[5].fieldname === 'disability_documents'){
            filteredBody.disability_documents = req.files[5].filename
        }
        if (req.files.length>5 && req.files[5].fieldname === 'additional_documents'){
            filteredBody.additional_documents = req.files[5].filename
        }else if (req.files.length>6 && req.files[6].fieldname === 'additional_documents'){
            filteredBody.additional_documents = req.files[6].filename
        }

        const application = await Application.create(filteredBody)

        res.status(200).json({data: application, status: 'success'})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

exports.updateApplication = async (req, res) => {
    try {
        const filteredBody = filterObj(req.body, 'registration_date', 'name', 'cid', 'dob', 'gender', 'occupation', 'number', 'email', 'current_address', 'permanent_address', 'institute_name', 'dealing_official', 'total_household_income', 'total_household_member', 'household_members', 'user')

        if (req.body.verification_document !== 'undefined') {
            filteredBody.verification_document = req.files[0].filename
        }
        if (req.body.family_tree !== 'undefined') {
            filteredBody.family_tree = req.files[1].filename
        }
        if (req.body.householdincome_document !== 'undefined') {
            filteredBody.householdincome_document = req.files[2].filename
        }
        if (req.body.householddisposable_document !== 'undefined') {
            filteredBody.householddisposable_document = req.files[3].filename
        }
        if (req.body.case_background !== 'undefined') {
            filteredBody.case_background = req.files[4].filename
        }
        if (req.files.length > 5 && req.files[5].fieldname === 'disability_documents') {
            filteredBody.disability_documents = req.files[5].filename
        }
        if (req.files.length > 5 && req.files[5].fieldname === 'additional_documents') {
            filteredBody.additional_documents = req.files[5].filename
        } else if (req.files.length > 6 && req.files[6].fieldname === 'additional_documents') {
            filteredBody.additional_documents = req.files[6].filename
        }

        const application = await Application.findByIdAndUpdate(req.params.id, filteredBody, {
            new: true,
            runValidators: true
        })

        if (!application) {
            return res.status(404).json({ error: 'No application found with that ID' })
        }

        res.status(200).json({ data: application, status: 'success' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.deleteApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndDelete(req.params.id)

        if (!application) {
            return res.status(404).json({ error: 'No application found with that ID' })
        }

        res.status(204).json({ data: null, status: 'success' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getApplication = async (req, res, next) => {
    try {
        const application = await Application.findById(req.params.id)
        if (!application) {
            return res.status(404).json({ error: 'No application found with that ID' })
        }
        res.status(200).json({ data: application, status: 'success' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getApplicationsByGender = async (req, res) => {
    try {
        const applicationsByGender = await Application.aggregate([
            {
                $group: {
                    _id: '$gender',  
                    total: { $sum: 1 }  
                }
            },
            {
                $sort: { _id: 1 }  
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: applicationsByGender
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};