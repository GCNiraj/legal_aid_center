const express = require('express')
const applicationController = require('./../controllers/applicationController')
const authController = require('./../controllers/authController')
const router = express.Router()

router
    .route('/')
    .post(authController.protect, applicationController.uploadVerificationDocument, applicationController.uploadFamilyTree, applicationController.uploadHouseholdIncome, applicationController.uploadHouseholddisposable, applicationController.uploadCaseDocument, applicationController.uploadDisabilityDocument, applicationController.uploadAdditionalDocument, applicationController.createApplication)

module.exports = router