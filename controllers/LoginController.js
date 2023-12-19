const LoginModel = require('../models/LoginModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {

    try {
        const username = req.body.username;
        const password = req.body.password.toString();
    
        LoginModel.loginUser(username, (err, results) => {
          if (err) {
            console.error('Error Authenticating User:', err);
            return res.status(500).json({ error: 'Error Authenticating User' });
          } else if (results.length > 0) {
            const storedHash = results[0].Password;
    
            bcrypt.compare(password, storedHash, (compareErr, compareResult) => {
              if (compareErr) {
                return res.status(500).json({ error: 'Error Authenticating User' });
              }
              if (compareResult) {
                const token = jwt.sign({ username: results[0].Username, fullname: results[0].Fullname, status: results[0].Status }, process.env.JWT_SECRET, {
                  expiresIn: '1h',
                });
                res.status(200).json({ message: 'User Authenticated successfully', token });
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