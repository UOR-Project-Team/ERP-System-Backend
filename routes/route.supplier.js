const express = require('express');
const { createSupplier, getSupplierById , readAllSuppliers, updateSupplier, deleteSupplier } = require('../controllers/controller.supplier');


const router = express.Router();

router.post('/create', createSupplier);
router.get('/:id', getSupplierById);
router.get('/', readAllSuppliers);
router.put('/:id', updateSupplier);
router.delete('/:id', deleteSupplier);

module.exports = router;
