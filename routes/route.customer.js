const express = require('express');
const { createCustomer, readCustomer, readAllCustomers, updateCustomer, deleteCustomer } = require('../controllers/controller.customer');

const router = express.Router();

router.post('/create', createCustomer);
router.get('/:id', readCustomer);
router.get('/', readAllCustomers);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;