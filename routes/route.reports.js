const express = require('express');
const router = express.Router();
const reportController = require('../controllers/controller.reports')


router.get('/profitloss', reportController.profitandloss);
router.get('/stock', reportController.StockMoment)

module.exports = router;