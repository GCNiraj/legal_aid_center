const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    caseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Case', 
        required: true
    },
    lawyerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    status: {
        type: String,
        enum: ['Under Assessment at Center', 'Pending at RBP / Court', 'Case Disposed'],
        required: true
    },
    dismissedDate: {
        type: Date
    },
    outcome: {
        type: String
    },
    report: {
        type: String,
        required: true
    }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
