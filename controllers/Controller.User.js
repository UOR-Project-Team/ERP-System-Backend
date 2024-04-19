// Import necessary packages
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const userModel = require('../models/model.user');
const {hashPassword} = require('./controller.password');



// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/users'); // Uploads will be stored in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename file to avoid overwriting
  }
});

const upload = multer({ storage: storage });

// Middleware to handle file upload
const uploadFile = upload.single('file');

// Function to delete an uploaded image
const deleteImage = (imageUrl) => {
  const filePath = imageUrl; // Path to the uploaded image
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting image:', err);
      throw err; // Handle the error as needed
    }
  });
};



// Controller function to authenticate users for login
const authenticateUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password.toString();

    // Check the user exists or not
    const loginResult = await userModel.authenticateUser(username);

    if (!loginResult) {
      return res.status(500).json({ error: 'Error Authenticating User' });
    } else if (loginResult.length > 0) {
      const storedHash = loginResult[0].Password;
      const saltPassword = password + loginResult[0].Salt;

      // Compare user password with database existing salt
      bcrypt.compare(saltPassword, storedHash, (compareErr, compareResult) => {
        if (compareErr) {
          return res.status(500).json({ error: 'Error Authenticating User Wrong Password' });
        }
        if (compareResult) {
          const token = jwt.sign({
            userid : loginResult[0].ID,
            username: loginResult[0].Username,
            fullname: loginResult[0].Fullname,
            email: loginResult[0].Email,
            nic: loginResult[0].NIC,
            jobrole: loginResult[0].JobRole,
            contactno: loginResult[0].ContactNo,
            address: loginResult[0].Address,
            city: loginResult[0].City,
            loginflag: loginResult[0].Loginflag,
            imageUrl: loginResult[0].ImageURL,
          }, process.env.JWT_SECRET, {
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

  } catch(error) {
    console.error('[Error] : ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to handle user creation and file upload
const createUser = async (req, res) => {
  try {
    // Extract password from request body and generate salt
    const password = req.body.password.toString();
    const salt = Math.floor(Math.random() * 1000000);

    // Combine password and salt, then hash the combined string
    const saltedPassword = password + salt;
    const hash = await hashPassword(saltedPassword);

    // Construct user data object
    const userData = {
      fullname: req.body.Fullname,
      email: req.body.email,
      username: req.body.username,
      password: hash,
      NIC: req.body.NIC,
      jobrole: req.body.jobrole,
      contactno: req.body.contactno,
      address: req.body.address,
      city: req.body.city,
      salt: salt
    };

    // Add user to the database and get the new user's ID
    const newUserId = await userModel.createUser(userData);

    // Send success response with user ID
    res.status(200).json({ message: 'User inserted successfully', userId: newUserId });

  } catch(err) {
    console.error('[Error] : ', err);
    
    // Check for duplicate entry error
    if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
      const attributeNameMatch = err.sqlMessage.match(/for key '(.+?)'/);
      const attributeName = attributeNameMatch ? attributeNameMatch[1] : 'unknown';
      return res.status(400).json({ message: `Duplicate Entry!`, attributeName });
    } 
    
    // Send generic error response for other errors
    res.status(500).json({ message: 'Error occurred while creation!' });
  }
};

// Controller function to select particular user by id
const readUserById = async(req, res)=>{
  try {
  const userid = req.params.id;
  const getUser = await userModel.getUserById(userid);
  res.status(200).json({ message: 'user retrieved successfully', user: getUser });
  } catch (err) {
    console.error('[Error] : ', err);
    res.status(500).json({ error: err.message });
  }
};

// Controller function to select all users
const readAllUsers = async (req, res) => {
  try {
    const usersinfo = await userModel.getAllUsers();
    res.status(200).json({ message: 'user retrieved successfully', user: usersinfo });
  } catch(err) {
    console.error('[Error] : ', err);
    res.status(500).json({ error: err.message });
  }
};

// Controller function to update particular user by admin
const updateUser = async (req, res) => {
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
      city: req.body.city
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
  } catch(err) {
    console.error('[Error] : ', err);
    if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
      const attributeNameMatch = err.sqlMessage.match(/for key '(.+?)'/);
      const attributeName = attributeNameMatch ? attributeNameMatch[1] : 'unknown';
      res.status(400).json({ message: `Duplicate Entry!`, attributeName });
    } else {
      res.status(500).json({ message: 'Error occurred while updation!' });
    }
  }
};

// Controller function to update particular user profile
const updateProfile = async (req, res) => {
  try {
    const userid = req.params.id;
    const userData = {
      fullname: req.body.fullname,
      email: req.body.email,
      NIC: req.body.NIC,
      contactno: req.body.contactno,
      address: req.body.address,
      city: req.body.city
    };

    if (req.file) {
      userData.imageUrl = req.file.path;
    }

    // Delete currently existing image from uploads
    const currentImageURl = await userModel.getUserImageURLById(userid); 

    if (currentImageURl && currentImageURl.length > 0) {
      const imageURL = currentImageURl[0][0].ImageURL;

      // Extract the file name from the URL
      const fileName = path.basename(imageURL);

      await userModel.updateProfile(userid, userData);

      // Check if the file name is not equal to 'default.png'
      if (fileName !== 'default.png') {
        deleteImage(imageURL);
      }
    }

    const getUser = await userModel.getUserById(userid);

    const token = jwt.sign({
      userid : getUser[0].ID,
      username: getUser[0].Username,
      fullname: getUser[0].Fullname,
      email: getUser[0].Email,
      nic: getUser[0].NIC,
      jobrole: getUser[0].JobRole,
      contactno: getUser[0].ContactNo,
      address: getUser[0].Address,
      city: getUser[0].City,
      loginflag: getUser[0].Loginflag,
      imageUrl: getUser[0].ImageURL,
    }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'User profile updated successfully', token });

  } catch(err) {
    console.error('[Error] : ', err);
    if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
      const attributeNameMatch = err.sqlMessage.match(/for key '(.+?)'/);
      const attributeName = attributeNameMatch ? attributeNameMatch[1] : 'unknown';
      res.status(400).json({ message: `Duplicate Entry!`, attributeName });
    } else {
      res.status(500).json({ message: 'Error occurred while updating!' });
    }
  }
};

// Controller function to verify user password
const verifyPassword = async (req, res) => {
  try {
    const updateid = req.params.id;
    const password = req.body.currentPW.toString();

    const result =await userModel.verifyPassword(updateid);

    if (result.length > 0) {
      // Assuming userPassword[0].password contains the hashed password from the database
      const hashedDbPassword = result[0].Password;
      const saltPassword = password + result[0].Salt;

      bcrypt.compare(saltPassword, hashedDbPassword, (compareErr, compareResult) => {
        if (compareErr) {
          return res.status(500).json({ message: "Error occured while password matching" });
        }
        if (compareResult) {
          res.status(200).json({ message: "Password matched" });
        } else {
          res.status(401).json({ message: "Password mismatched" });
        }
      });

    } else {
      res.status(404).json({ message: 'User not found' });
    }

  } catch(err) {
    console.error('[Error] :', err);
    res.status(500).json({ message: 'Error ocured while verification!' });
  }
};

// Controller function to udate user password
const updatePassword = async(req, res)=>{
  try{
    const userid = req.params.id

    // Extract password from request body and generate salt
    const password = req.body.newPW.toString();
    const salt = Math.floor(Math.random() * 1000000);

    // Combine password and salt, then hash the combined string
    const saltedPassword = password + salt;
    const hash = await hashPassword(saltedPassword);

    const updateData = {
      password: hash,
      salt: salt
    }

    await userModel.updatePassword(userid, updateData);
    res.status(200).json({message: 'User Password Change successfully'})
  } catch(error) {
    console.error('[Error] :', error);
    res.status(500).json({ error: 'Error occured while reset password!' });
  }
};

// Controller function to udate user password
const updateLoginFlag = async(req, res)=>{
  try{
    const userid = req.params.id
    await userModel.updateLoginFlag(userid);
    res.status(200).json({message: 'LoginFlag updated successfully'})
  } catch(error) {
    console.error('[Error] :', error);
    res.status(500).json({ error: 'Error occured while update LoginFlag !' });
  }
};

// Controller function to send user data as JWT token
const getUserToken = async(req, res)=>{
  try{
    const userid = req.params.id;
    const getUser = await userModel.getUserById(userid);
    const token = jwt.sign({
      userid : getUser[0].ID,
      username: getUser[0].Username,
      fullname: getUser[0].Fullname,
      email: getUser[0].Email,
      nic: getUser[0].NIC,
      jobrole: getUser[0].JobRole,
      contactno: getUser[0].ContactNo,
      address: getUser[0].Address,
      city: getUser[0].City,
      loginflag: getUser[0].Loginflag,
    }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ message: 'User retrieved successfully', token });
  } catch(err) {
    console.error('[Error] : ', err);
    res.status(500).json({ error: err.message });
  }
};

const searchUser = async(req, res)=>{

  try{
  const search = req.query.term;

  const users = await userModel.searchuser(search);

  res.status(200).json({ message: 'user retrieved successfully', user: users });

  } catch(err) {
    console.error('[Error] : ', err);
    res.status(500).json({ error: err.message });
}
}

// Controller function to delete particular user
const deleteUser = async(req, res) =>{
  try{
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Delete user image from uploads directory
    const currentImageURl = await userModel.getUserImageURLById(userId);

    if (currentImageURl && currentImageURl.length > 0) {
      const imageURL = currentImageURl[0][0].ImageURL;

      if (imageURL !== 'uploads/users/default.png') {
        deleteImage(imageURL);
      }
    }

    // Delete User data from mySql database
    const deluser = await userModel.deleteUser(userId);

    if (deluser > 0) {
      res.status(200).json({ message: 'User deleted successfully', userId: userId });
    } else {
      res.status(404).json({ error: 'User not found or already deleted' });
    } 

  } catch(err) {
    console.error('[Error] : ', err);
    res.status(500).json({error: err.message});
  }
};


module.exports = { uploadFile, authenticateUser, createUser, readAllUsers, readUserById, updateUser, updateProfile, verifyPassword, updatePassword, updateLoginFlag, getUserToken, searchUser, deleteUser };
