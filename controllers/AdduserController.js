const adduserModel = require('../models/AdduserModel');

const addUser = (req, res) => {

    const userData = {
        Fullname: req.body.Fullname,
        email: req.body.Email,
        username: req.body.Username,
        password: req.body.Password,
        NIC:req.body.NIC,
        jobrole: req.body.JobRole,
        mobileno: req.body.MobileNo,
        address: req.body.Address,
        city: req.body.City,
        Status: req.body.Status
      };
      

  adduserModel.addUser(userData, (err, results) => {
    if (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ message: 'User created successfully', userId: results.insertId });
  });
};

module.exports = { addUser };