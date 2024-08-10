const express = require('express')
const router = express.Router()
const viewsController = require('./../controllers/viewController')
const authController = require('./../controllers/authController')

router.get('/dashboard', viewsController.getDashboardPage)
router.get('/', viewsController.getLoginPage)
router.get('/register', viewsController.getRegisterPage)
router.get('/applicationForm', viewsController.getApplicationPage)
// router.get('/me',authController.protect,viewsController.getProfile)



// /* Reset form for password */
// router.get('/resetPassword/:token', (req, res) => {
//     // Render the form or a page to enter a new password
//     res.send(`
//         <form action="/api/v1/users/resetPassword" method="POST">
//             <input type="hidden" name="token" value="${req.params.token}" />
//             <label for="newPassword">New Password:</label>
//             <input type="password" id="newPassword" name="newPassword" required />
//             <label for="passwordConfirm">Confirm Password:</label>
//             <input type="password" id="passwordConfirm" name="passwordConfirm" required />
//             <button type="submit">Reset Password</button>
//         </form>
//     `);
// });

module.exports = router