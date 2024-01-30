const LoginModel = require('../models/model.login');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {hashPassword} = require('./controller.password');

const loginUser = async (req, res) => {

    try {
        const username = req.body.username;
        const password = req.body.password.toString();
    
        const loginResult = await LoginModel.loginUser(username);
          if (!loginResult) {
            console.error('Error Authenticating User:', err);
            return res.status(500).json({ error: 'Error Authenticating User' });
          } else if (loginResult.length > 0) {
            const storedHash = loginResult[0].Password;
    
            bcrypt.compare(password, storedHash, (compareErr, compareResult) => {
              if (compareErr) {
                return res.status(500).json({ error: 'Error Authenticating User Wrong Password' });
              }
              if (compareResult) {
                console.log(compareResult)
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
                }, process.env.JWT_SECRET, {
                  expiresIn: '1h',
                });

                const updateResult = LoginModel.updateloginflag(username);
                  if (updateResult <= 0) {
                    console.error('Error updating login flag:', updateErr);
                    return res.status(500).json({ error: 'Error Authenticating User' });
                  };
                res.status(200).json({ message: 'User Authenticated successfully', token });
                

              } else {
                res.status(401).json({ error: 'Invalid Password' });
              }
            });
          } else {

            res.status(401).json({ error: 'Invalid credentials' });

          }

      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};


const resetPasswordController = async(req, res)=>{
    try{
      const username = req.params.name


      const password = req.body.password.toString();
      const newhashpassword =await hashPassword(password);

      const resetuserpassword = await LoginModel.resetpassword(username,newhashpassword);

      if(resetuserpassword >0){
      res.status(200).json({message: 'User Password Change successfully', userId: resetuserpassword})
      }else{
        res.status(404).json({message: 'Invalid UserName'})
      }

    }catch (error) {
        console.error('Error during Reset password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const changePasswordController = async (req, res) => {
  try {
    let hash = '';
    const userid = req.params.id;
    const currentPW = req.body.currentPW;
    const newPW = req.body.newPW;

    

    await userModel.updateProfile(userid, userData);
    res.status(200).json({ message: 'Password updated successfully' });

  } catch (err) {
    console.error('Error updating password:', err);
    res.status(500).json({ message: 'Error occurred while updating!' });
  }
};

module.exports = {loginUser,resetPasswordController}