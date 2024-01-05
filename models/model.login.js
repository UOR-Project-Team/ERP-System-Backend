const db1 = require('../dbConfig')
const db = require('../connection')

const loginUser = async(username, callback) => {


  const query = "SELECT * FROM user where Username = ? ";

  db1.query(query, username, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};


const resetpassword = async(username, newpassword) =>{

  try{
    const connection = await db.getConnection();

    const sqlQuery = 'UPDATE user SET Password = ?, Loginflag = 1 WHERE Username = ?';

    const [result, fields] = await connection.execute(sqlQuery,[newpassword,username]);
    connection.release();
    
    return result.affectedRows;
    }catch(error){
        throw new Error(`Error fetching users: ${error.message}`);
    }

}

const updateloginflag = async(username)=>{
  try{
    const connection = await db.getConnection();

    const sqlQuery = 'UPDATE user SET Loginflag = Loginflag+1 WHERE Username = ?';

    const [result, fields] = await connection.execute(sqlQuery,[username]);
    connection.release();
    return result.affectedRows;
    }catch(error){
        throw new Error(`Error fetching users: ${error.message}`);
    }
}

module.exports = { loginUser,resetpassword,updateloginflag };