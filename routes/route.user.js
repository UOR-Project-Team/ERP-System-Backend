const express = require('express');
const router = express.Router();
const userController = require('../controllers/controller.user');

// Define routes
router.post('/login', userController.authenticateUser); 
router.get('/show', userController.readAllUsers);
router.get('/getuser/:id', userController.readUserById);
router.get('/getUserToken/:id', userController.getUserToken);
router.get('/search', userController.searchUser);
router.post('/create', userController.createUser);
router.post('/verifyPW/:id', userController.verifyPassword);
router.put('/update/:id', userController.updateUser);
router.put('/loginFlag/:id', userController.updateLoginFlag);
router.put('/profile/:id', userController.uploadFile, userController.updateProfile);
router.put('/changePW/:id', userController.updatePassword);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
