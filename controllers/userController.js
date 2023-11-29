const userModel = require('../models/userModel');

const createUser = (req, res) => {
  // const { username, age, password } = req.body;

  // const userData = { username, age, password };
      //another Approach
  const userData = {
    username: req.body.username,
    age: req.body.age,
    password: req.body.password
  };
  

  userModel.createUser(userData, (err, results) => {
    if (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ message: 'User created successfully', userId: results.insertId });
  });
};

module.exports = { createUser };