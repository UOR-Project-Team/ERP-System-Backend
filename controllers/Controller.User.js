const db = require('../connection');
const userModel = require('../models/Model.user');
const {hashPassword} = require('./controller.password');

const getUsersController = async (req, res) => {
  try {
    const usersinfo = await userModel.getUsers();
    //console.log(usersinfo);
    res.status(200).json({ message: 'user retrieved successfully', user: usersinfo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByIDController = async(req, res)=>{
    try{
    const userid = req.params.id;

    const getUser = await userModel.GetuserID(userid);
    

    res.status(200).json({ message: 'user retrieved successfully', user: getUser });

    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

const AddUserController = async (req, res)=>{
    try{
        const password = req.body.password.toString();
        
        const hash =await hashPassword(password);
        
    

    const userData = {
        Fullname: req.body.Fullname,
        email: req.body.email,
        username: req.body.username,
        password: hash,
        NIC:req.body.NIC,
        jobrole: req.body.jobrole,
        contactno: req.body.contactno,
        address: req.body.address,
        city: req.body.city,
      };


        const newuser = await userModel.addUser(userData);

        res.status(200).json({message: 'User inserted successfully', userId: newuser})
    }catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: error.message });
      }
}

const deleteuserByIDcontroller = async(req, res) =>{
    try{
        const deleteid = req.params.id;

        if (!deleteid) {
            return res.status(400).json({ error: 'Invalid user ID' });
          }

        const deluser = await userModel.DeleteuserByID(deleteid);

        if (deluser > 0) {
            res.status(200).json({ message: 'User deleted successfully', userId: deleteid });
          } else {
            res.status(404).json({ error: 'User not found or already deleted' });
          } 

    }catch(error){
        res.status(500).json({error: error.message});
        
    }
}

const updateUserController = async (req, res) => {
  const updateid = req.params.id;
  if (!updateid) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    let hash = '';
    const { password } = req.body;
    if (password) {
      hash = await hashPassword(password);
    }

    const userData = {
      Fullname: req.body.Fullname,
      email: req.body.email,
      username: req.body.username,
      NIC: req.body.NIC,
      jobrole: req.body.jobrole,
      contactno: req.body.contactno,
      address: req.body.address,
      city: req.body.city,
    };

    if (hash !== '') {
      userData.password = hash;
    }

    const updateuser = await userModel.updateUser(updateid, userData);

    if (updateuser > 0) {
      res.status(200).json({ message: 'User Updated successfully', userId: updateid });
    } else {
      res.status(404).json({ error: 'Error Updating User' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const searchUser = async(req, res)=>{

  try{
  const search = req.query.term;

  const users = await userModel.searchuser(search);

  res.status(200).json({ message: 'user retrieved successfully', user: users });

  }catch(error){
    console.error('Error Searching user:', error); 
    return res.status(500).json({ error: 'Internal Server Error' });
}
}

module.exports = { getUsersController,getUserByIDController,AddUserController,deleteuserByIDcontroller,updateUserController,searchUser };
