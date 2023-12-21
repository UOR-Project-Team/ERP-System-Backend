const express = require('express');
const supplierController = require('../controllers/SupplierController');

const router = express.Router();

router.post('/create', supplierController.addSupplier);

router.get('/show',supplierController.GetAllSupplier);

router.delete('/delete/:id', supplierController.deleteSupplier);

router.get('/getbyid/:id', supplierController.getSupplierById);
router.put('/update/:id', supplierController.updateSupplier);

module.exports = router;