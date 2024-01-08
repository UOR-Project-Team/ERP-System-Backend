const express = require('express');
const invoiceController = require('../controllers/controller.invoice');


const router = express.Router();

router.get('/customers', invoiceController.getCustomers);
router.get('/items', invoiceController.getAllItems);
router.get('/product/:id', invoiceController.getItemPriceById);
router.get('/invoices', invoiceController.getAllInvoices);

router.post('/list', invoiceController.addinvoicelist);

module.exports = router;
