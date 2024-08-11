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
        const cases = await Case.findById(req.params.id)
        cases.nature_of_case = cases.nature_of_case
        cases.case_details = req.body.case_details
        cases.type_of_service_provided = req.body.type_of_service_provided
        cases.name_of_service_provider = req.body.name_of_service_provider
        cases.number_of_service_provider = req.body.number_of_service_provider
        cases.email_of_service_provider = req.body.email_of_service_provider
        cases.dzongkhag = req.body.dzongkhag
        cases.name_lawfirm = req.body.name_lawfirm
        cases.appointment_date = req.body.appointment_date
        cases.license_number = req.body.license_number
        cases.fee_structure = req.body.fee_structure
        cases.court = req.body.court
        cases.court_official_name = req.body.court_official_name
        cases.court_official_number = req.body.court_official_number
        cases.court_official_email = req.body.court_official_email
        cases.case_status = req.body.case_status
        cases.disposed_date = req.body.disposed_date
        cases.outcome = req.body.outcome
        cases.impact = req.body.impact
        cases.save()
        res.json({ data: cases, status: "success" })
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

exports.getTotalCases = async (req, res, next) => {
    try {
        const totalCases = await Case.countDocuments();

        res.status(200).json({
            status: 'success',
            data: {
                totalCases
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getActiveCases = async (req, res, next) => {
    try {
        const activeCases = await Case.countDocuments({ case_status: 'Active' });

        res.status(200).json({
            status: 'success',
            data: {
                activeCases
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSettledCases = async (req, res, next) => {
    try {
        const settledCases = await Case.countDocuments({ case_status: 'Completed' });

        res.status(200).json({
            status: 'success',
            data: {
                settledCases
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};