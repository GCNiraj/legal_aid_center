const express = require('express')
const applicationController = require('./../controllers/applicationController')
const authController = require('./../controllers/authController')
const router = express.Router()

router
    .route('/')
    .post(authController.protect, applicationController.uploadVerificationDocument, applicationController.createApplication)
    .get(authController.protect, applicationController.getAllApplications) 

router.get('/report/gender', applicationController.getApplicationsByGender);
router.get('/report/occupation', applicationController.getApplicationsByOccupation);
router.get('/totalApplications', applicationController.getTotalApplications);

router
    .route('/:id')
    .put(authController.protect, applicationController.updateDetails)
    .get(authController.protect, applicationController.getApplication) 
    .patch(authController.protect, applicationController.uploadVerificationDocument, applicationController.updateApplication) 
    .delete(authController.protect, applicationController.deleteApplication); 


module.exports = router