const express = require('express');
const { createSupplier, getSupplierById , readAllSuppliers, updateSupplier, activateSupplier, deactivateSupplier, deleteSupplier } = require('../controllers/controller.supplier');

const router = express.Router();

router.post('/create', createSupplier);
router.get('/:id', getSupplierById);
router.get('/', readAllSuppliers);
router.put('/:id', updateSupplier);
router.put('/activate/:id', activateSupplier);
router.put('/deactivate/:id', deactivateSupplier);
router.delete('/:id', deleteSupplier);

module.exports = router;
