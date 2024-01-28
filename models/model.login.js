const db = require('../connection')

const loginUser = async(username) => {

  const connection = await db.getConnection();
  const query = "SELECT * FROM user where Username = ? ";

  const [results, fields] = await connection.execute(query,[username]);
  connection.release();
    
    return results;
  
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