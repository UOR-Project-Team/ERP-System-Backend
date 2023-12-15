const express = require('express')
const router = express.Router()
const unitController = require('../controllers/unitController');
const unitmodel = require('../models/unitModel')

router.post('/create', unitController.createunit);
router.get('/get',unitmodel.retrieveUnits);
router.delete('/delete/:id', unitController.deleteUnit);

//router.get('/get', unitmodel.retrieveUnits);

 module.exports = router;