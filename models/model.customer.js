const db = require('../connection');

const createCustomer = async (data) => {
  try {
    const { title, fullname, email, nic, contactno, street1, street2, city, country, vatno } = data;
    const connection = await db.getConnection();
    const query = 'INSERT INTO customer (title, fullname, email, nic, contactno, street1, street2, city, country, vatno, debit, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0.00, 1)';
    const [results] = await connection.execute(query, [title, fullname, email, nic, contactno, street1, street2, city, country, vatno]);
    connection.release();
    return results.insertId;
  } catch (err) {
    throw err;
  }
};

const getCustomerById = async (id) => {
  try {
    const connection = await db.getConnection();
    const query = 'SELECT * FROM customer WHERE id = ?';
    const [results] = await connection.execute(query, [id]);
    connection.release();
    return results[0];
  } catch (err) {
    throw err;
  }
};

const getAllCustomers = async () => {
  try {
    const connection = await db.getConnection();
    const query = 'SELECT * FROM customer';
    const [results] = await connection.execute(query);
    connection.release();
    return results;
  } catch (err) {
    throw err;
  }
};

const updateCustomer = async (id, data) => {
  try {
    const { title, fullname, email, nic, contactno, street1, street2, city, country, vatno } = data;
    const connection = await db.getConnection();
    const query = 'UPDATE customer SET title=?, fullname=?, email=?, nic=?, contactno=?, street1=?, street2=?, city=?, country=?, vatno=? WHERE id=?';
    await connection.query(query, [title, fullname, email, nic, contactno, street1, street2, city, country, vatno, id]);
    connection.release();
  } catch (err) {
    throw err;
  }
};

const activateCustomer = async (cusomerId) => {
  try {
    const connection = await db.getConnection();
    const query = 'UPDATE customer SET Status=1 WHERE id=?';
    await connection.query(query, [cusomerId]);
    connection.release();
  } catch (err) {
    throw err;
  }
};

const deactivateCustomer = async (cusomerId) => {
  try {
    const connection = await db.getConnection();
    const query = 'UPDATE customer SET Status=0 WHERE id=?';
    await connection.query(query, [cusomerId]);
    connection.release();
  } catch (err) {
    throw err;
  }
};

const deleteCustomer = async (id) => {
  try {
    const connection = await db.getConnection();
    const query = 'DELETE FROM customer WHERE id = ?';
    await connection.query(query, [id]);
    connection.release();
  } catch (err) {
    throw err;
  }
};

module.exports = { createCustomer, getCustomerById, getAllCustomers, updateCustomer, activateCustomer, deactivateCustomer, deleteCustomer };
