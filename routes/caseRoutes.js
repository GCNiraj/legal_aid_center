const express = require('express');
const caseController = require('../controllers/caseController');

const router = express.Router();

router.route('/')
    .post(caseController.createCase)
    .get(caseController.getAllCases);

router.route('/:id')
    .get(caseController.getCaseById)
    .put(caseController.updateCase)
    .delete(caseController.deleteCase);

module.exports = router;
