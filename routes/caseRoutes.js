const express = require('express');
const caseController = require('../controllers/caseController');

const router = express.Router();

router.route('/')
    .post(caseController.createCase)
    .get(caseController.getAllCases);
router.get('/report/dzongkhag', caseController.getDzongkhagCaseReport);
router.get('/report/nature', caseController.getCasesByNature);
router.get('/report/status', caseController.getCasesByStatus);
router.get('/report/feestructure', caseController.getCasesByFeeStructure);

router.get('/totalCases', caseController.getTotalCases);
router.get('/activeCases', caseController.getActiveCases);
router.get('/settledCases', caseController.getSettledCases);

router.route('/:id')
    .get(caseController.getCaseById)
    .put(caseController.updateCase)
    .delete(caseController.deleteCase);

module.exports = router;
