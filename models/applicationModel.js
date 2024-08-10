const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    registration_date: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    cid: {
        type: String,
        required: [true, 'Please enter your CID No.']
    },
    dob: {
        type: String,
        required: [true, 'Please enter your Date of Birth']
    },
    gender:{
        type: String,
        enum : ['Male','Female','Others']
    },
    occupation: {
        type: String,
        requried: [true, 'Please enter your occupation']
    },
    number: {
        type: String,
        required: [true, 'Please enter your phone number']
    },
    email: {
        type: String
    },
    current_address: [
        {
            current_village: {
                type: String,
                required: [true, 'Please enter your current village']
            },
            current_gewog: {
                type: String,
                required: [true, 'Please enter your current Gewog']
            },
            current_dzongkhag: {
                type: String,
                required: [true, 'Please enter your current Dzongkhag']
            }
        }],
    permanent_address: [
        {
            permanent_village: {
                type: String,
                required: [true, 'Please enter your permanent village']
            },
            permanent_gewog: {
                type: String,
                required: [true, 'Please enter your permanent Gewog']
            },
            permanent_dzongkhag: {
                type: String,
                required: [true, 'Please enter your permanent Dzongkhag']
            }
        }
    ],
    institute_name: {
        type: String,
        required: [true, 'Please enter your institute name']
    },
    dealing_official: [
        {
            dealing_official_name: {
                type: String
            },
            dealing_official_phone: {
                type: String
            },
            dealing_official_email: {
                type: String
            }
        }
    ],
    total_household_income: {
        type: String,
        required: [true, 'Please enter total household income']
    },
    total_household_member: {
        type: String,
        required: [true, 'Please enter total household member']
    },
    household_members: [
        {
            member_name: {
                type: String
            },
            member_relationship: {
                type: String
            },
            member_occupation: {
                type: String
            },
            member_phone: {
                type: String
            },
            member_email: {
                type: String
            },
            member_information: {
                type: String
            }
        }
    ],
    verification_document: {
        type: String,
        required: [true, 'Please upload your CID document or Passport document']
    },
    family_tree: {
        type: String,
        required: [true, 'Please upload your family tree document']
    },
    householdincome_document: {
        type: String,
        required: [true, 'Please upload your household income document']
    },
    householddisposable_document: {
        type: String,
        required: [true, 'Please upload your household disposable capital document']
    },
    case_background: {
        type: String,
        required: [true, 'Please upload your case background']
    },
    disability_documents: {
        type: String
    },
    additional_documents: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Application must belong to a user.']
    },
    verified_status: {
        type: String,
        enum: ['Rejected','Pending','Approved'],
        default: 'Pending'
    },
    remarks:{
        type: String
    }
})

const Application = mongoose.model('Application', applicationSchema)

module.exports = Application