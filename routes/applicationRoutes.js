const express = require('express')
const applicationController = require('./../controllers/applicationController')
const authController = require('./../controllers/authController')
const router = express.Router()

router
    .route('/')
    .post(authController.protect, applicationController.uploadVerificationDocument, applicationController.createApplication)

module.exports = router