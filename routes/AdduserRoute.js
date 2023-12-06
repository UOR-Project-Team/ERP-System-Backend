const express = require('express');
const adduserController = require('../controllers/AdduserController');

const router = express.Router();

router.post('/create', adduserController.addUser);
router.get('/getuserid/:id',adduserController.selectuser);


module.exports = router;