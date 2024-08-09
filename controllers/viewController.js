const path = require('path')

/* Login Page */
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'login.html'))
}