const path = require('path')

/* Login Page */
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'login.html'))
}

/* Register Page */
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'register.html'))
}

/* Dashboard Page */
exports.getDashboardPage = (req, res) => {
    res.sendFile(path.join(__dirname,'../','views','dashboard.html'))
}

/* Application Page */ 
exports.getApplicationPage = (req, res) => {
    res.sendFile(path.join(__dirname,'../', 'views', 'applicationForm.html'))
}

/* Applications Page */
exports.getApplications = (req, res) => {
    res.sendFile(path.join(__dirname,'../','views','application.html'))
} 