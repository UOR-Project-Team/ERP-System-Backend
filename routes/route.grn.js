const express = require('express');
const grncontroller = require('../controllers/controller.grn');

const router = express.Router();

router.get('/generateID/:id', grncontroller.getGRNNumbers);
router.get('/suppliers', grncontroller.getSuppliers);
router.get('/items/:id', grncontroller.getItemsById);
router.post('/list', grncontroller.grnlist);

module.exports = router;