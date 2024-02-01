const express = require('express');
const router = express.Router();
const userController = require('../controllers/Controller.User');

// Define routes
router.get('/show', userController.getUsersController);
router.get('/getuser/:id', userController.getUserByIDController);
router.get('/getUserToken/:id', userController.getUserToken);
router.get('/search', userController.searchUser);
router.post('/create',userController.AddUserController);
router.post('/verifyPW/:id',userController.verifyPassword);
router.put('/update/:id',userController.updateUserController);
router.put('/profile/:id',userController.updateProfileController);
router.put('/changePW/:id',userController.updatePassword);
router.delete('/delete/:id',userController.deleteuserByIDcontroller);

module.exports = router;
