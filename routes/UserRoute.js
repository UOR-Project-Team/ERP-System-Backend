const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

router.get('/show' ,userController.GetAllUser);
router.post('/create', userController.addUser);

// router.get('/users/:id', userController.getUserById);
// router.put('/users/:id', userController.updateUser);
// router.delete('/users/:id', userController.deleteUser);

module.exports = router;