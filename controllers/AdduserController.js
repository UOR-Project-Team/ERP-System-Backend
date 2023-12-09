const adduserModel = require('../models/AdduserModel');
const {hashPassword} = require('./PassowrdController')

const addUser = async(req, res) => {

    try{
    const password = req.body.Password.toString();
    const hash =await hashPassword(password)
    

    const userData = {
        Fullname: req.body.Fullname,
        email: req.body.Email,
        username: req.body.Username,
        password: hash,
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
      return res.status(500).json({ error: 'Error Creating User' });
    }else if(results && results.insertId){
      res.status(201).json({ message: 'User created successfully', userId: results.insertId });
    }else{
      return res.status(501).json({ error: 'Internal Server Error' });
    }
    
  });

  }catch(e){
    console.log(e);
  }

};

module.exports = { addUser };