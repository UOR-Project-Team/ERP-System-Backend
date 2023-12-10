const express = require('express');
const addsupplierController = require('../controllers/SupplierController');
const showSupplierinfo = require('../models/ViewSupplierModel')

const router = express.Router();

router.post('/create', addsupplierController.addSupplier);

router.get('/show',showSupplierinfo.Showsupplier);

module.exports = router;