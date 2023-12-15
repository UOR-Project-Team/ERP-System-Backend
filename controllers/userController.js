const userModel = require('../models/UserModel');
const {hashPassword} = require('./PasswordController')


const addUsercontroller = async(req, res) => {
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
        Contactno: req.body.mobileno,
        address: req.body.address,
        city: req.body.city,
      };

       userModel.addUser(userData, (err, results) => {
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

const GetAlluserController = async (req, res) => {
  try {
    const results = await userModel.getAllUsers(); 
    
    if (results && results.length > 0) {
      res.status(200).json({ message: 'Users retrieved successfully', users: results });
    } else {
      res.status(404).json({ error: 'No users found' });
    }
  } catch (error) {
    console.error('Error retrieving users', error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
}

const GetUserByIdController = async (req, res) => {
  const userId = req.params.id; // Assuming the user ID is passed as a parameter in the URL

  try {
    const user = await userModel.getUserById(userId);

    if (user) {
      res.status(200).json({ message: 'User retrieved successfully', user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user by ID', error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
}

const UpdateUserController = async (req, res) => {
  const userId = req.params.id; //from url
  const updatedUserData = req.body; //from frontend

  try {
    const affectedRows = await userModel.UpdateUser(userId, updatedUserData);

    if (affectedRows > 0) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ error: 'No user found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating user', error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
};


const deleteUserController = async (req, res) => {
  const userId = req.params.ID; 

  try {
    const result = await userModel.DeleteUser(userId);
    res.status(200).json({ message: `${result} user deleted successfully` });

  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
};




module.exports = {
  addUsercontroller,
  GetAlluserController,
  deleteUserController,
  UpdateUserController
};

