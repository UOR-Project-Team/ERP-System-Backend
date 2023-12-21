const db = require('../connection')

const getUsers = async () => {
  try {
    // Get a connection from the pool
    const connection = await db.getConnection();

    const sqlQuery = 'SELECT * FROM user';

    const [result, fields] = await connection.execute(sqlQuery);

    connection.release();

    return result;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

const GetuserID =async(id)=>{
    try{
    const connection = await db.getConnection();

    const sqlQuery = 'SELECT * FROM user WHERE ID = ?';

    const [result, fields] = await connection.execute(sqlQuery,[id]);
    connection.release();

    return result;
    }catch(error){
        throw new Error(`Error fetching users: ${error.message}`);
    }
}

const addUser = async (userData) => {
    try {
      const connection = await db.getConnection();
  
      const { Fullname, email, username, password, NIC, jobrole, contactno, address, city} = userData;

    const sqlQuery = 'INSERT INTO user (Fullname, Email, Username, Password, NIC, JobRole, ContactNo, Address, City, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)';
    const values = [
      Fullname, email, username, password, NIC, jobrole, contactno, address, city
    ];
  
      
      const [result,field] = await connection.execute(sqlQuery, values);
  
      // Release the connection back to the pool
      connection.release();
  
      return result.insertId; // Return the ID of the inserted user
    } catch (error) {
      console.error('Error inserting user:', error); 
      throw new Error(`Error inserting user: ${error.message}`);
    }
  };

  const DeleteuserByID =async(id)=>{
    try{
    const connection = await db.getConnection();

    const sqlQuery = 'DELETE FROM user WHERE ID = ?';

    const [result, fields] = await connection.execute(sqlQuery,[id]);
    connection.release();

    return result.affectedRows;
    }catch(error){
        throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  const updateUser = async(id, newuserData)=>{
    try{
        const connection = await db.getConnection();

        const { Fullname, email, username,password, NIC, jobrole, contactno, address, city} = newuserData;

        const sqlQuery = 'UPDATE user SET Fullname = ?, Email = ?, Username = ?,Password = ?, NIC = ?, JobRole = ?, ContactNo = ?, Address = ?, City = ? WHERE ID = ?;';
        const values = [
            Fullname, email, username,password, NIC, jobrole, contactno, address, city, id
          ];

          const [result, fields] = await connection.execute(sqlQuery,[Fullname, email, username,password, NIC, jobrole, contactno, address, city, id]);
            connection.release();

            return result.affectedRows;

    }catch(error){
        throw new Error(`Error updating user: ${error.message}`);
    }
  }

  const searchuser = async(term)=>{
    try{
      const connection = await db.getConnection();

    const sqlQuery = 'SELECT * FROM user WHERE Fullname LIKE ? OR Email LIKE ? OR Username LIKE ? OR NIC LIKE ?';

    const [result, fields] = await connection.execute(sqlQuery,[`%${term}%`, `%${term}%`, `%${term}%`, `%${term}%`]);
    connection.release();

    return result;
    
    }catch(error){
        console.error('Error updating user:', error); 
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

module.exports = { getUsers,GetuserID,addUser,DeleteuserByID,updateUser,searchuser };