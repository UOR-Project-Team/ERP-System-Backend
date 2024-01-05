const express = require('express');
const { getCustomers, getAllItems , getItemPriceById } = require('../controllers/controller.invoice');


const router = express.Router();

router.get('/customers', getCustomers);
router.get('/items', getAllItems);
router.get('/product/:id', getItemPriceById);

module.exports = router;
