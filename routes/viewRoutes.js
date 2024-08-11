const express = require('express')
const router = express.Router()
const viewsController = require('./../controllers/viewController')
const authController = require('./../controllers/authController')

router.get('/dashboard', viewsController.getDashboardPage)
router.get('/', viewsController.getLoginPage)
router.get('/register', viewsController.getRegisterPage)
router.get('/applicationForm', viewsController.getApplicationPage)
router.get('/application', viewsController.getApplications)
router.get('/applicationDetails',viewsController.getApplicationDetails)
router.get('/setPassword/:token', viewsController.getSetPassword);
router.get('/caseDetails',viewsController.getCaseDetails)

// router.get('/me',authController.protect,viewsController.getProfile)




module.exports = router