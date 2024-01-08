const express = require('express');
const grncontroller = require('../controllers/controller.grn');


const router = express.Router();

router.get('/suppliers', grncontroller.getSuppliers);
router.get('/items/:id', grncontroller.getItemsById);
router.post('/list', grncontroller.grnlist);

//router.get('/search', grncontroller.searchSuppliers);

module.exports = router;
