const express = require('express');
const itemController = require('../controllers/controller.item');

const router = express.Router();

router.post('/create', itemController.Additem);
router.get('/',itemController.getAllItems);
router.get('/unit/:id',itemController.getAllItemsByUnit);
router.get('/category/:id',itemController.getAllItemsByCategory);
router.get('/supplier/:id',itemController.getAllItemsBySupplier);
router.delete('/:id', itemController.deleteItem);
router.put('/:id', itemController.updateItem);

module.exports = router;