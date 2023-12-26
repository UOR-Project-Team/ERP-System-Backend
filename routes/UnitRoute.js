const express = require('express')
const router = express.Router()
const unitController = require('../controllers/unitController');
const unitmodel = require('../models/unitModel')

router.post('/create', unitController.createunit);
router.get('/',unitmodel.retrieveUnits);
router.get('/:id',unitController.getUnitById);
router.delete('/delete/:id', unitController.deleteUnit);
router.put('/update/:id', unitController.updateUnit);


//router.get('/get', unitmodel.retrieveUnits);

 module.exports = router;