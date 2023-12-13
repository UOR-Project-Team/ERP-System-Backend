const LoginModel = require('../models/LoginModel');
const {hashPassword} = require('./PasswordController')
const bcrypt = require('bcrypt');

const loginUser = async(req, res) => {

    try {
        const password = req.body.password.toString();
    
        const userData = {
          username: req.body.username
        };
    
        LoginModel.loginUser(userData, (err, results) => {
          if (err) {
            console.error('Error Authenticating User:', err);
            return res.status(500).json({ error: 'Error Authenticating User' });
          } else if (results.length > 0) { // Check if there are any matching users in results
            const storedHash = results[0].Password; //getting Database value 
    
            bcrypt.compare(password, storedHash, (compareErr, compareResult) => {
              if (compareErr) {
                return res.status(500).json({ error: 'Error Authenticating User' });
              }
              if (compareResult) {
                res.status(200).json({ message: 'User Authenticated successfully', user: results[0] });
              } else {
                res.status(401).json({ error: 'Invalid Password' });
              }
            });
          } else {

            res.status(401).json({ error: 'Invalid credentials' });

          }
        });
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

module.exports = {loginUser}