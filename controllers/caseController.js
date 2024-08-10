const Case = require('../models/caseModels');  

exports.createCase = async (req, res) => {
    try {
        const newCase = await Case.create(req.body);
        res.status(201).json({
            success: true,
            data: newCase
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

exports.getAllCases = async (req, res) => {
    try {
        const cases = await Case.find().populate('application');  
        res.status(200).json({
            success: true,
            data: cases
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

exports.getCaseById = async (req, res) => {
    try {
        const caseData = await Case.findById(req.params.id).populate('application');
        if (!caseData) {
            return res.status(404).json({
                success: false,
                message: 'Case not found'
            });
        }
        res.status(200).json({
            success: true,
            data: caseData
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

exports.updateCase = async (req, res) => {
    try {
        const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedCase) {
            return res.status(404).json({
                success: false,
                message: 'Case not found'
            });
        }
        res.status(200).json({
            success: true,
            data: updatedCase
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

exports.deleteCase = async (req, res) => {
    try {
        const deletedCase = await Case.findByIdAndDelete(req.params.id);
        if (!deletedCase) {
            return res.status(404).json({
                success: false,
                message: 'Case not found'
            });
        }
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

exports.getDzongkhagCaseReport = async (req, res) => {
    try {
        const report = await Case.aggregate([
            {
                $addFields: {
                    appointment_date_as_date: {
                        $dateFromString: { dateString: "$appointment_date" }
                    }
                }
            },
            {
                $group: {
                    _id: "$dzongkhag",
                    totalCases: { $sum: 1 },
                    casesByYear: {
                        $push: {
                            year: { $year: "$appointment_date_as_date" }, 
                            caseCount: 1
                        }
                    }
                }
            },
            {
                $sort: { _id: 1 } 
            }
        ]);
        
        res.status(200).json({
            status: 'success',
            data: report
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};


exports.getCasesByNature = async (req, res) => {
    try {
        const report = await Case.aggregate([
            {
                $group: {
                    _id: "$nature_of_case", 
                    totalCases: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 } 
            }
        ]);
        res.status(200).json({
            status: 'success',
            data: report
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getCasesByStatus = async (req, res) => {
    try {
        const report = await Case.aggregate([
            {
                $group: {
                    _id: "$case_status", 
                    totalCases: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 } 
            }
        ]);
        res.status(200).json({
            status: 'success',
            data: report
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getCasesByFeeStructure = async (req, res) => {
    try {
        const casesByFeeStructure = await Case.aggregate([
            {
                $group: {
                    _id: '$fee_structure',  
                    total: { $sum: 1 }  
                }
            },
            {
                $sort: { _id: 1 }  
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: casesByFeeStructure
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};
