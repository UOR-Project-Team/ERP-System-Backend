const express = require('express');
const { createCustomer, readCustomer, readAllCustomers, updateCustomer, deleteCustomer } = require('../controllers/controller.customer');

const router = express.Router();



module.exports = router;