const express = require('express');
const itemController = require('../controllers/controller.item');
//const showItemInfo = require('../models/viewItemModel')

const router = express.Router();

router.post('/create', itemController.Additem);

//router.get('/show',showItemInfo.Showitem);
router.get('/',itemController.getAllItems);

router.delete('/:id', itemController.deleteItem);

router.put('/:id', itemController.updateItem);

module.exports = router;