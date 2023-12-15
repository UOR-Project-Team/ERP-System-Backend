//const db = require('../dbConfig');
const db = require('../connection')

// const addUser = (userData, callback) => {
//   const { Fullname,email,username,password,NIC,jobrole,mobileno,mobileno2,address,city,Status } = userData;

//   const query = 'INSERT INTO users (Fullname,Email,Username,Password,NIC,JobRole,MobileNo,MobileNo2,Address,City,Status) VALUES (?,?,?,?,?,?,?,?,?,?,1)';
//   const values = [
//     Fullname,email,username,password,NIC,jobrole,mobileno,mobileno2,address,city,Status
//   ]

//   db.query(query, values, (err, data) => {
//     if (err) {
//       return callback(err, null);
//     }
//     return callback(null, data);
//   });
// };


// const GetAllUser = (callback) => {
  
//   const query = 'SELECT *FROM user';

//   db.query(query, values, (err, data) => {
//     if (err) {
//       return callback(err, null);
//     }
//     return callback(null, data);
//   });
// };

// module.exports = { addUser,GetAllUser };



const AddUser = async (userData) => {
  try {
    const { Fullname, email, username, password, NIC, jobrole, contactno, address, city, Status } = userData;

    const query = 'INSERT INTO user (Fullname, Email, Username, Password, NIC, JobRole, ContactNo, Address, City, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)';
    const values = [
      Fullname, email, username, password, NIC, jobrole, contactno, address, city, Status
    ];

    const [data] = await db.execute(query, values);
    return data.insertId; 
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const query = 'SELECT * FROM user';
    const data = await db.execute(query);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (id) => {
  try {
    const query = 'SELECT * FROM user WHERE ID = ?';
    const [data] = await db.execute(query, [id]);
    return data[0];
  } catch (err) {
    throw err;
  }
};

const UpdateUser = async (id, newData) => {
  try {
    const { Fullname, email, username, password, NIC, jobrole, contactno, address, city} = newData;

    const query = 'UPDATE user SET Fullname=?, Email=?, Username=?, Password=?, NIC=?, JobRole=?, ContactNo=?, Address=?, City=? WHERE ID=?';
    const values = [Fullname, email, username, password, NIC, jobrole, contactno, address, city]

    const [data] = await db.query(query, values);
    return data.insertId;
  } catch (err) {
    throw err;
  }
};

const DeleteUser = async (id) => {
  try {
    const query = 'DELETE FROM user WHERE ID = ?';
    const data = await db.query(query, [id]);
    if (data.affectedRows > 0) {
      return data.affectedRows;
    } else {
      throw new Error('No user found with the provided ID');
    }
  } catch (err) {
    throw err;
  }
}

module.exports = { AddUser, getAllUsers,getUserById,UpdateUser,DeleteUser};