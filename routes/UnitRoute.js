const express = require('express')
const router = express.Router()
const unitmodel = require('../models/unitModel');

//Add create unit router here with path


router.get('/get', unitmodel.retrieveUnits);

 module.exports = router;