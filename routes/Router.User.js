const express = require('express');
const router = express.Router();
const userController = require('../controllers/controller.user');

// Define routes
router.post('/create',userController.AddUserController);
router.get('/show', userController.getUsersController);
router.get('/getuser/:id', userController.getUserByIDController);
router.delete('/delete/:id',userController.deleteuserByIDcontroller);
router.put('/update/:id',userController.updateUserController);

router.get('/search', userController.searchUser);

module.exports = router;
