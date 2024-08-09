const mongoose = require('mongoose')
const validator = require('validator')

const applicationSchema = new mongoose.Schema({
    registration_number: {
        type: String,
    },
    registration_date: {
        type: Date
    },
    
})

const Application = mongoose.model('Application', applicationSchema)

module.exports = Application