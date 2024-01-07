const express = require('express');
const { getCustomers, getAllItems , getItemPriceById , getAllInvoices } = require('../controllers/controller.invoice');


const router = express.Router();

router.get('/customers', getCustomers);
router.get('/items', getAllItems);
router.get('/product/:id', getItemPriceById);
router.get('/invoices', getAllInvoices);

module.exports = router;
