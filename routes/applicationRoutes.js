const express = require('express')
const applicationController = require('./../controllers/applicationController')
const authController = require('./../controllers/authController')
const router = express.Router()

router
    .route('/')
    .post(authController.protect, applicationController.uploadVerificationDocument, applicationController.createApplication)
    .get(authController.protect, applicationController.getAllApplications) 

router
    .route('/:id')
    .get(authController.protect, applicationController.getApplication) 
    .patch(authController.protect, applicationController.uploadVerificationDocument, applicationController.updateApplication) 
    .delete(authController.protect, applicationController.deleteApplication); 

module.exports = router;

module.exports = router