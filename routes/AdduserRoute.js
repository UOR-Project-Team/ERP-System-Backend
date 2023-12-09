const express = require('express');
const adduserController = require('../controllers/AdduserController');
const showuserinfo = require('../models/ShowuserModel')

const router = express.Router();

router.post('/create', adduserController.addUser);
router.get('/getuserid/:id',adduserController.selectuser);


router.get('/show',showuserinfo.Showuser);

module.exports = router;