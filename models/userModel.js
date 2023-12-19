const db = require('../dbConfig');


const AddUser = async (userData) => {
  try {
    const { Fullname, email, username, password, NIC, jobrole, contactno, address, city, Status } = userData;

    const query = 'INSERT INTO user (Fullname, Email, Username, Password, NIC, JobRole, ContactNo, Address, City, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)';
    const values = [
      Fullname, email, username, password, NIC, jobrole, contactno, address, city, Status
    ];

    const [data, field] = await db.execute(query, values);
    return data.insertId; 
  } catch (error) {
    throw new Error(error.message);
  }
};

const GetAllUsers = async () => {
  try {
    const query = 'SELECT * FROM user';
    const [data, field] = await db.execute(query);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const GetUserById = async (id) => {
  try {
    const query = 'SELECT * FROM user WHERE ID = ?';
    const [data, field] = await db.execute(query, [id]);
    return data[0];
  } catch (err) {
    throw err;
  }
};

const UpdateUser = async (id, newData) => {
  try {
    const { Fullname, email, username, password, NIC, jobrole, contactno, address, city} = newData;

    const query = 'UPDATE user SET Fullname=?, Email=?, Username=?, Password=?, NIC=?, JobRole=?, ContactNo=?, Address=?, City=? WHERE ID=?';
    const values = [Fullname, email, username, password, NIC, jobrole, contactno, address, city, id]

    const data= await db.query(query, values);
    return data.insertId;
  } catch (err) {
    throw err;
  }
};

const DeleteUsers = async (id) => {
  try {
    const query = 'DELETE FROM user WHERE ID = ?';
    const data = await db.query(query, [id]);
    if (data.affectedRows > 0) {
      return data.affectedRows;
    } else {
      return 0;
    }
  } catch (err) {
    throw err;
  }
}

module.exports = { 
  AddUser, 
  GetAllUsers,
  GetUserById,
  UpdateUser,
  DeleteUsers};

  