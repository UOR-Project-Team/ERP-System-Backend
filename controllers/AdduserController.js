const adduserModel = require('../models/AdduserModel');
const bcrypt = require('bcrypt')
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
        jobrole: req.body.jobroleobRole,
        mobileno: req.body.mobileNo,
        mobileno2: req.body.mobileNo2,
        address: req.body.Address,
        city: req.body.City,
        Status: req.body.Status
      };

       adduserModel.addUser(userData, (err, results) => {
                if (err) {
                     console.error('Error creating user', err);
                     return res.status(500).json({ error: 'Error creating user' });
                }else if (results && results.insertId) {
                     res.status(201).json({ message: 'User created successfully', userId: results.insertId });
                }else{
                     return res.status(500).json({ error: 'Internal Server' });
               }
        });
  }catch(e){
    console.log(e);
  }

};

// const selectuser= async(req, res)=>{
//   try{

//        const userID = req.params.id;

//     adduserModel.selectUser(userID, (err, results) => {
//              if (err) {
//                   console.error('Error getting user:', err);
//                   return res.status(500).json({ error: 'Error getting user id' });
//              }else if (results && results.length >0) {
//                   res.status(201).json({ message: 'successfull', user: results });
//              }else{
//                   return res.status(500).json({ error: 'Internal Server ID' });
//             }
//      });
// }catch(e){
//  console.log(e);
// }
// }

module.exports = { addUser };