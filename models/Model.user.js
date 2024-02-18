const db = require('../connection');
//const nodemailer = require('nodemailer');

const getUsers = async () => {
  try {
    // Get a connection from the pool
    const connection = await db.getConnection();

    const sqlQuery = 'SELECT * FROM user';

    const [result, fields] = await connection.execute(sqlQuery);

    connection.release();

    return result;
  }catch(err){
    throw err;
  }
};

const GetuserID =async(id)=>{
    try{
    const connection = await db.getConnection();

    const sqlQuery = 'SELECT * FROM user WHERE ID = ?';

    const [result] = await connection.execute(sqlQuery,[id]);
    connection.release();

    return result;
  }catch(err){
    throw err;
  }
}

  const addUser = async (userData) => {
    try {
      const connection = await db.getConnection();
      const { Fullname, email, username, password, NIC, jobrole, contactno, address, city} = userData;
      const sqlQuery = 'INSERT INTO user (Fullname, Email, Username, Password, NIC, JobRole, ContactNo, Address, City, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)';
      const [result] = await connection.execute(sqlQuery, [Fullname, email, username, password, NIC, jobrole, contactno, address, city]);
      connection.release();
      return result.insertId;
    } catch (err) {
      throw err;
    }
  };

  const DeleteuserByID =async(id)=>{
    try{
    const connection = await db.getConnection();

    const sqlQuery = 'DELETE FROM user WHERE ID = ?';

    const [result] = await connection.execute(sqlQuery,[id]);
    connection.release();

    return result.affectedRows;
    }catch(err){
      throw err;
    }
  }

  const updateUser = async (id, newuserData) => {
    try {
      const connection = await db.getConnection();
  
      const { Fullname, email, username, password, NIC, jobrole, contactno, address, city } = newuserData;
      let sqlQuery = '';
      let values = [];
  
      if (password) {
        sqlQuery = 'UPDATE user SET Fullname = ?, Email = ?, Username = ?, Password = ?, NIC = ?, JobRole = ?, ContactNo = ?, Address = ?, City = ? WHERE ID = ?;';
        values = [Fullname, email, username, password, NIC, jobrole, contactno, address, city, id];
      } else {
        sqlQuery = 'UPDATE user SET Fullname = ?, Email = ?, Username = ?, NIC = ?, JobRole = ?, ContactNo = ?, Address = ?, City = ? WHERE ID = ?;';
        values = [Fullname, email, username, NIC, jobrole, contactno, address, city, id];
      }
  
      const [result] = await connection.execute(sqlQuery, values);
      connection.release();
  
      return result.affectedRows;
    }catch(err){
      throw err;
    }
  };

  const updateProfile = async (id, newuserData) => {
    try {
      const connection = await db.getConnection();
      const { fullname, email, NIC, contactno, address, city } = newuserData;
      let sqlQuery = 'UPDATE user SET Fullname = ?, Email = ?, NIC = ?, ContactNo = ?, Address = ?, City = ? WHERE ID = ?;';
      let values = [fullname, email, NIC, contactno, address, city, id];
      await connection.execute(sqlQuery, values);
      connection.release();
    } catch(err) {
      throw err;
    }
  };

  const searchuser = async(term)=>{
    try{
      const connection = await db.getConnection();

    const sqlQuery = 'SELECT * FROM user WHERE Fullname LIKE ? OR Email LIKE ? OR Username LIKE ? OR NIC LIKE ?';

    const [result, fields] = await connection.execute(sqlQuery,[`%${term}%`, `%${term}%`, `%${term}%`, `%${term}%`]);
    connection.release();

    return result;
    
  }catch(err){
    throw err;
  }
  
  }

  const verifyPassword = async(userid) =>{

    try{
      const connection = await db.getConnection();
      const sqlQuery = 'Select Password from user WHERE id = ?';
      const [result] = await connection.execute( sqlQuery, [userid]);
      connection.release();
      return result;
      } catch(error) {
          throw new Error(`${error.message}`);
      }
  }

  const updatePassword = async(userid, newpassword) =>{
    try{
      const connection = await db.getConnection();
      const sqlQuery = 'UPDATE user set password=? WHERE id = ?';
      await connection.execute( sqlQuery, [newpassword, userid]);
      connection.release();
      } catch(error) {
          throw new Error(`${error.message}`);
      } 
  }

module.exports = { getUsers,GetuserID,addUser,DeleteuserByID,updateUser, updateProfile, searchuser, verifyPassword, updatePassword };