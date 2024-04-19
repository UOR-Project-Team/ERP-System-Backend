const db = require('../connection');
//const nodemailer = require('nodemailer');

const authenticateUser = async(username) => {
  try {
    const connection = await db.getConnection();
    const query = "SELECT * FROM user where Username = ? ";
    const [results, fields] = await connection.execute(query,[username]);
    connection.release();
    return results;
  
  } catch(error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

const createUser = async (userData) => {
  try {
    const connection = await db.getConnection();
    const {fullname, email, username, password, NIC, jobrole, contactno, address, city, salt} = userData;
    const sqlQuery = 'INSERT INTO user (Fullname, Email, Username, Password, NIC, JobRole, ContactNo, Address, City, Salt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [result] = await connection.execute(sqlQuery, [fullname, email, username, password, NIC, jobrole, contactno, address, city, salt]);
    connection.release();
    return result.insertId;
  } catch (err) {
    throw err;
  }
};

const getUserById =async(id)=>{
  try{
    const connection = await db.getConnection();
    const sqlQuery = 'SELECT * FROM user WHERE ID = ?';
    const [result] = await connection.execute(sqlQuery,[id]);
    connection.release();
    return result;
  } catch (err) {
    throw err;
  }
};

const getAllUsers = async () => {
  try {
    const connection = await db.getConnection();
    const sqlQuery = 'SELECT * FROM user';
    const [result, fields] = await connection.execute(sqlQuery);
    connection.release();
    return result;
  } catch (err) {
    throw err;
  }
};

const getUserImageURLById =async(id)=>{
  try{
    const connection = await db.getConnection();
    const sqlQuery = 'SELECT ImageURL FROM user WHERE ID = ?';
    const result = await connection.execute(sqlQuery,[id]);
    connection.release();
    return result;
  } catch (err) {
    throw err;
  }
};

const updateUser = async (id, newuserData) => {
  try {
    const connection = await db.getConnection();
  
    const { Fullname, email, username, password, NIC, jobrole, contactno, imageUrl, address, city } = newuserData;
    let sqlQuery = 'UPDATE user SET Fullname = ?, Email = ?, Username = ?, NIC = ?, JobRole = ?, ContactNo = ?, Address = ?, City = ? WHERE ID = ?;';
    let values = [Fullname, email, username, NIC, jobrole, contactno, address, city, id];
    
    if(password) {
      sqlQuery += 'UPDATE user SET Password=? WHERE ID=?';
      values.push(password, id);
    }

    if(imageUrl) {
      sqlQuery += 'UPDATE user SET ImageURL=? WHERE ID=?';
      values.push(imageUrl, id);
    }
  
    const [result] = await connection.execute(sqlQuery, values);
    connection.release();
  
    return result.affectedRows;
  } catch(err){
    throw err;
  }
};
  
const updateProfile = async (userId, userData) => {
  try {
    const connection = await db.getConnection();
  
    const { fullname, email, NIC, contactno, address, city, imageUrl } = userData;
    const sqlQuery = 'UPDATE user SET Fullname = ?, Email = ?, NIC = ?, ContactNo = ?, Address = ?, City = ? WHERE ID = ?';
    const values = [fullname, email, NIC, contactno, address, city, userId];
  
    await connection.execute(sqlQuery, values);
  
    if (imageUrl) {
      const imageQuery = 'UPDATE user SET ImageURL = ? WHERE ID = ?';
      const imageValues = [imageUrl, userId];
      await connection.execute(imageQuery, imageValues);
    }
  
    connection.release();
    return;
  } catch (err) {
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
    const sqlQuery = 'Select Password, Salt from user WHERE id = ?';
    const [result] = await connection.execute( sqlQuery, [userid]);
    connection.release();
    return result;
  } catch(error) {
      throw new Error(`${error.message}`);
  }
}

const updatePassword = async(userid, data) =>{
  try{
    const connection = await db.getConnection();
    const sqlQuery = 'UPDATE user set Password=?, Salt=? WHERE id = ?';
    await connection.execute( sqlQuery, [data.password, data.salt, userid]);
    connection.release();
  } catch(error) {
      throw new Error(`${error.message}`);
  } 
}

const updateLoginFlag = async(userid) =>{
  try{
    const connection = await db.getConnection();
    const sqlQuery = 'UPDATE user set LoginFlag=1 WHERE id = ?';
    await connection.execute( sqlQuery, [userid]);
    connection.release();
  } catch(error) {
      throw new Error(`${error.message}`);
  } 
}

const deleteUser =async(id)=>{
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

module.exports = { authenticateUser, createUser, getUserById, getAllUsers, getUserImageURLById, updateUser, updateProfile, searchuser, verifyPassword, updatePassword, updateLoginFlag, deleteUser, };