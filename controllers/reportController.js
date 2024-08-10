const Report = require('../models/reportModel'); 
const Case = require('../models/caseModels');
const User = require('../models/userModels');
const AppError = require('../utils/appError'); 

exports.createReport = async (req, res, next) => {
    try {
        const { caseID, lawyerID, status, dismissedDate, outcome, report } = req.body;

        const caseExists = await Case.findById(caseID);
        const lawyerExists = await User.findOne({ _id: lawyerID, role: 'Lawyer' });

        if (!caseExists) {
            return next(new AppError('Case not found', 404));
        }

        if (!lawyerExists) {
            return next(new AppError('Lawyer not found or not a lawyer', 404));
        }

        const newReport = await Report.create({
            caseID,
            lawyerID,
            status,
            dismissedDate,
            outcome,
            report
        });

        res.status(201).json({
            status: 'success',
            data: newReport
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllReports = async (req, res, next) => {
    try {
        const reports = await Report.find().populate('caseID lawyerID');
        res.status(200).json({
            status: 'success',
            data: reports
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getReportById = async (req, res, next) => {
    try {
        const report = await Report.findById(req.params.id).populate('caseID lawyerID');

        if (!report) {
            return next(new AppError('No report found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: report
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateReport = async (req, res, next) => {
    try {
        const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).populate('caseID lawyerID');

        if (!report) {
            return next(new AppError('No report found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: report
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteReport = async (req, res, next) => {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);

        if (!report) {
            return next(new AppError('No report found with that ID', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
