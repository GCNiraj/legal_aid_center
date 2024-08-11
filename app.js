const express = require("express")
const path = require('path')
const app = express()
const cookieParser = require('cookie-parser')
const logger = require('./logger')

const userRouter = require('./routes/userRoutes')
const applicationRouter = require('./routes/applicationRoutes')
const viewRouter = require('./routes/viewRoutes')
const caseRoutes = require('./routes/caseRoutes');  
const reportRoutes = require('./routes/reportRoutes');
// const utilityRoutes = require('./routes/utilityRoutes')  


app.use(express.static(path.join(__dirname, 'views')))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter)
app.use('/api/v1/applications', applicationRouter)
app.use('/api/v1/cases', caseRoutes);
app.use('/api/v1/reports', reportRoutes);
// app.use('/api/v1/utility', utilityRoutes);

app.use('/', viewRouter)

app.use((err, req, res, next) => {
    logger.error(err, err.message);
    res.status(500).send({ message: err.message, error: err });
});

module.exports = app