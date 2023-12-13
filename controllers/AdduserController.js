const adduserModel = require('../models/AdduserModel');
const {hashPassword} = require('./PasswordController')

const addUser = async(req, res) => {

    try{

      const password = req.body.password.toString();
    const hash =await hashPassword(password)
    

    const userData = {
        Fullname: req.body.fullname,
        email: req.body.email,
        username: req.body.username,
        password: hash,
        NIC:req.body.NIC,
        jobrole: req.body.jobrole,
        mobileno: req.body.mobileno,
        mobileno2: req.body.mobileno2,
        address: req.body.address,
        city: req.body.city,
      };

       adduserModel.addUser(userData, (err, results) => {
                if (err) {
                     console.error('Error creating user', err);
                     return res.status(500).json({ error: 'Error creating user' });
                }else if (results && results.insertId) {
                     res.status(200).json({ message: 'User created successfully', userId: results.insertId });
                }else{
                     return res.status(500).json({ error: 'Internal Server' });
               }
        });
  }catch(e){
    console.log(e);
  }

};


module.exports = { addUser};
