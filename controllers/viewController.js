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

/* Application Details Page */
exports.getApplicationDetails = (req, res) => {
    res.sendFile(path.join(__dirname,'../','views','applicationDetails.html'))
} 

exports.getSetPassword = (req, res) => {
    res.sendFile(path.join(__dirname,'../','views','setPassword.html'))
} 

/* Case Details Page */
exports.getCaseDetails = (req, res) => {
    res.sendFile(path.join(__dirname,'../','views','caseDetails.html'))
}

exports.getUserDashboard = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/users/userDashboard.html'));
}

exports.getLawyerDashboard = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/lawyer/lawyerDashboard.html'));
}