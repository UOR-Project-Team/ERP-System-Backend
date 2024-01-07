const express = require('express');
const { createCustomer, readCustomer, readAllCustomers, updateCustomer, activateCustomer, deactivateCustomer, deleteCustomer } = require('../controllers/controller.customer');

const router = express.Router();

router.post('/create', createCustomer);
router.get('/:id', readCustomer);
router.get('/', readAllCustomers);
router.put('/:id', updateCustomer);
router.put('/activate/:id', activateCustomer);
router.put('/deactivate/:id', deactivateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;