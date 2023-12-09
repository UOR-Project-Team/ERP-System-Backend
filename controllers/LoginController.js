const LoginModel = require('../models/LoginModel');
const {hashPassword} = require('./PassowrdController')

const loginUser = async(req, res) => {

    const password = req.body.Password.toString();
    const hash =await hashPassword(password)
 
      //another Approach
  const userData = {
    username: req.body.Username,
    password: hash
  };
  

  LoginModel.loginUser(userData, (err, results) => {
    if (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ message: 'User Authentication successfully', userId: results.insertId });
  });
};

module.exports = {loginUser}