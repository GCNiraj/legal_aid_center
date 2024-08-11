const mongoose = require('mongoose')

const caseSchema = new mongoose.Schema({
    nature_of_case: {
        type: String,
        enum: ['Civil','Criminal']
    },
    case_details: {
        type: String,
        // required: [true, 'Please enter the details of the case']
    },
    type_of_service_provided: {
        type: String,
        // required: [true, 'Please enter a type of service provided']
    },
    name_of_service_provider: {
        type: String,
        // required: [true, 'Please enter the name of service provider']
    },
    number_of_service_provider: {
        type: String,
        // required: [true, 'Please enter the contact number for service provider']
    },
    email_of_service_provider: {
        type: String,
        // required: [true, 'Please enter the email for service provider']
    },
    dzongkhag: {
        type: String,
        // required: [true, 'Please enter the dzongkhag of the service provider']
    },
    name_lawfirm:{
        type: String,
        // required: [true, 'Please enter the name of the law firm']
    },
    license_number: {
        type: String,
        // required: [true,'Please enter your license number']
    },
    appointment_date: {
        type: String,
        // required: [true, 'Please enter an appointment date']
    },
    fee_structure:{
        type: String,
        enum: ['Probono','Fee-Based']
    },
    court: {
        type:String,
        // required: [true, 'Please enter a court ']
    },
    court_official_name: {
        type: String,
        // required: [true, 'Please enter a court official name']
    },
    court_official_number: {
        type: String,
        // required: [true,'Please enter a court official number']
    },
    court_official_email: {
        type: String,
        // required: [true,'Please enter a court official email ']
    },
    case_status: {
        type: String,
        enum: ['On Progress','Active','Completed']
    },
    disposed_date: {
        type: String
    },
    outcome: {
        type: String
    },
    impact: {
        type: String
    },
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: [true,'Case must be an approved application'],
        unique: true
    }
})
caseSchema.pre(/^find/, function(next){
    this.populate({
        path: 'application',
        select: 'name'
    })
    next()
})

const Case = mongoose.model('Case', caseSchema)

module.exports = Case