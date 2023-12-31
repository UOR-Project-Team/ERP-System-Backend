const LoginModel = require('../models/model.login');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {hashPassword} = require('./controller.password');

const loginUser = async (req, res) => {

    try {
        const username = req.body.username;
        const password = req.body.password.toString();
    
        LoginModel.loginUser(username, (err, results) => {
          if (err) {
            console.error('Error Authenticating User:', err);
            return res.status(500).json({ error: 'Error Authenticating User' });
          } else if (results.length > 0) {
            const storedHash = results[0].Password;
    
            bcrypt.compare(password, storedHash, (compareErr, compareResult) => {
              if (compareErr) {
                return res.status(500).json({ error: 'Error Authenticating User' });
              }
              if (compareResult) {
                console.log(compareResult)
                const token = jwt.sign({
                  userid : results[0].ID,
                  username: results[0].Username,
                  fullname: results[0].Fullname,
                  jobrole: results[0].JobRole,
                  loginflag: results[0].Loginflag, 
                }, process.env.JWT_SECRET, {
                  expiresIn: '1h',
                });
                LoginModel.updateloginflag(username, (updateErr, loginflag) => {
                  if (updateErr) {
                    console.error('Error updating login flag:', updateErr);
                    return res.status(500).json({ error: 'Error Authenticating User' });
                  }});
                res.status(200).json({ message: 'User Authenticated successfully', token });
                

              } else {
                res.status(401).json({ error: 'Invalid Password' });
              }
            });
          } else {

            res.status(401).json({ error: 'Invalid credentials' });

          }
        });

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

module.exports = {loginUser,resetPasswordController}