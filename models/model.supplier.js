const db = require('../connection');

const createSupplier = async (supplierData) => {
  try {
    const { Title, Fullname, Description, RegistrationNo, VatNo, Email, ContactNo, Fax, Street1, Street2, City, Country  } = supplierData;
    const connection = await db.getConnection();
    const query = 'INSERT INTO Supplier (Title, Fullname, Description, RegistrationNo, VatNo, Email, ContactNo, Fax, Street1, Street2, City, Country, Credit, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  0 ,1)';
    const [results] = await connection.execute(query, [Title, Fullname, Description, RegistrationNo, VatNo, Email, ContactNo, Fax, Street1, Street2, City, Country]);
    connection.release();
    return results.insertId;
  } catch (err) {
    throw err;
  }
};

const getSupplierById = async (supplierId) => {
  try {
    const connection = await db.getConnection();
    const query = 'SELECT * FROM Supplier WHERE id = ?';
    const [results] = await connection.execute(query, [supplierId]);
    connection.release();
    return results[0];
  } catch (err) {
    throw err;
  }
};

const getAllSuppliers = async () => {
  try {
    const connection = await db.getConnection();
    const query = 'SELECT * FROM Supplier';
    const [results] = await connection.execute(query);
    connection.release();
    return results;
  } catch (err) {
    throw err;
  }
};

const updateSupplier = async (supplierId, supplierData) => {
  try {
    const { Title, Fullname, Description, RegistrationNo, VatNo, Email, ContactNo, Fax, Street1, Street2, City, Country } = supplierData;
    const connection = await db.getConnection();
    const query = 'UPDATE Supplier SET Title=?, Fullname=?, Description=?, RegistrationNo=?, VatNo=?, Email=?, ContactNo=?, Fax=?, Street1=?, Street2=?, City=?, Country=? WHERE id=?';
    await connection.query(query, [Title, Fullname, Description, RegistrationNo, VatNo, Email, ContactNo, Fax, Street1, Street2, City, Country, supplierId]);
    connection.release();
  } catch (err) {
    throw err;
  }
};

const activateSupplier = async (supplierId) => {
  try {
    const connection = await db.getConnection();
    const query = 'UPDATE Supplier SET Status=1 WHERE id=?';
    await connection.query(query, [supplierId]);
    connection.release();
  } catch (err) {
    throw err;
  }
};

const deactivateSupplier = async (supplierId) => {
  try {
    const connection = await db.getConnection();
    const query = 'UPDATE Supplier SET Status=0 WHERE id=?';
    await connection.query(query, [supplierId]);
    connection.release();
  } catch (err) {
    throw err;
  }
};

const deleteSupplier = async (supplierId) => {
  try {
    const connection = await db.getConnection();
    const query = 'DELETE FROM Supplier WHERE ID = ?';
    await connection.query(query, [supplierId]);
    connection.release();
  } catch (err) {
    throw err;
  }
};

module.exports = { createSupplier, getSupplierById, getAllSuppliers, updateSupplier, activateSupplier, deactivateSupplier, deleteSupplier };
