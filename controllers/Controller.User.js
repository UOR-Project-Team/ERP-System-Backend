const db = require('../connection');
const userModel = require('../models/Model.user');
const {hashPassword} = require('./PasswordController');

const getUsersController = async (req, res) => {
  try {
    const usersinfo = await userModel.getUsers();
    //console.log(usersinfo);
    res.status(200).json({ message: 'user retrieved successfully', user: usersinfo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserByIDController = async(req, res)=>{
    try{
    const userid = req.params.id;

    const getUser = await userModel.GetuserID(userid);
    

    res.status(200).json({ message: 'user retrieved successfully', user: getUser });

    }catch(err){
        res.status(500).json({ error: err.message });
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
    }catch (err) {
      console.error('Error creating customer:', err);
      if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
        const attributeNameMatch = err.sqlMessage.match(/for key '(.+?)'/);
        const attributeName = attributeNameMatch ? attributeNameMatch[1] : 'unknown';
        res.status(400).json({ message: `Duplicate Entry!`, attributeName });
      } else {
        res.status(500).json({ message: 'Error occurred while creation!' });
      }
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

    }catch(err){
        res.status(500).json({error: err.message});
        
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
  } catch (err) {
    console.error('Error creating customer:', err);
    if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
      const attributeNameMatch = err.sqlMessage.match(/for key '(.+?)'/);
      const attributeName = attributeNameMatch ? attributeNameMatch[1] : 'unknown';
      res.status(400).json({ message: `Duplicate Entry!`, attributeName });
    } else {
      res.status(500).json({ message: 'Error occurred while creation!' });
    }
    }
};

const searchUser = async(req, res)=>{

  try{
  const search = req.query.term;

  const users = await userModel.searchuser(search);

  res.status(200).json({ message: 'user retrieved successfully', user: users });

  }catch(err){
    res.status(500).json({ error: err.message });
}
}

module.exports = { getUsersController,getUserByIDController,AddUserController,deleteuserByIDcontroller,updateUserController,searchUser };
