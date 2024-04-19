const express = require('express');
const { readAllGrnsForCurrentYear, readAllInvoicesForCurrentYear, readTopSellingItems, readMonthlyGrnCount, readMonthlyInvoiceCount } = require('../controllers/controller.dashboard');

const router = express.Router();

router.get('/YearlyGrns', readAllGrnsForCurrentYear);
router.get('/YearlyInvoices', readAllInvoicesForCurrentYear);
router.get('/topSales', readTopSellingItems);
router.get('/monthlyGrnCount', readMonthlyGrnCount);
router.get('/monthlyInvoiceCount', readMonthlyInvoiceCount);

module.exports = router;