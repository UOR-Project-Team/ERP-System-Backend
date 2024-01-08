const express = require('express');
const { createUnit, getUnitById , readAllUnits, updateUnit, deleteUnit } = require('../controllers/controller.unit');


const router = express.Router();

router.post('/create', createUnit);
router.get('/:id', getUnitById);
router.get('/', readAllUnits);
router.put('/:id', updateUnit);
router.delete('/:id', deleteUnit);

module.exports = router;
