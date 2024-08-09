const express = require('express')
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/verifyemail', authController.verifyOtp)
router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword', authController.resetPassword);
router.get('/logout',authController.logout)
router.patch('/updateMyPassword',authController.protect,authController.updatePassword)
router.patch('/updateMe',authController.protect,userController.uploadUserPhoto,userController.updateMe)


router.get('/resetPassword/:token', (req, res) => {
    // Render the form or a page to enter a new password
    res.send(`
        <form action="/api/v1/users/resetPassword" method="POST">
            <input type="hidden" name="token" value="${req.params.token}" />
            <label for="newPassword">New Password:</label>
            <input type="password" id="newPassword" name="newPassword" required />
            <label for="passwordConfirm">Confirm Password:</label>
            <input type="password" id="passwordConfirm" name="passwordConfirm" required />
            <button type="submit">Reset Password</button>
        </form>
    `);
});


router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router