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
