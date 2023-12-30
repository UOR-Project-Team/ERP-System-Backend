const express = require('express');
const { getSuppliers, getItemsById } = require('../controllers/controller.grn');


const router = express.Router();

router.get('/suppliers', getSuppliers);
router.get('/items/:id', getItemsById);

module.exports = router;
