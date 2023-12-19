const db = require('../connection');

const createSupplier = async (supplierData) => {
  try {
    const { Fullname, RegistrationNo, Email,ContactNo, FAX, Address, City, Description, VATNo } = supplierData;

    const query = 'INSERT INTO Supplier (Fullname, RegistrationNo, Email, ContactNo, FAX, Address, City, Description, VATNo, Credit, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0 ,1)';
    const [results] = await db.execute(query, [Fullname, RegistrationNo, Email, ContactNo, FAX, Address, City, Description, VATNo]);

    return results.insertId;
  } catch (err) {
    throw err;
  }
};

const getSupplierById = async (supplierId) => {
  try {
    const query = 'SELECT * FROM Supplier WHERE id = ?';
    const [results] = await db.execute(query, [supplierId]);
    return results[0];
  } catch (err) {
    throw err;
  }
};

const getAllSuppliers = async () => {
  try {
    const query = 'SELECT * FROM Supplier';
    const [results] = await db.execute(query);
    return results;
  } catch (err) {
    throw err;
  }
};

const updateSupplier = async (supplierId, supplierData) => {
  try {
    const { Fullname, RegistrationNo, Email, ContactNo, FAX, Address, City, Description, VATNo } = supplierData;

    const query = 'UPDATE Supplier SET Fullname=?, RegistrationNo=?, Email=?, ContactNo=?, FAX=?, Address=?, City=?, Description=?, VATNo=? WHERE id=?';
    await db.query(query, [Fullname, RegistrationNo, Email, ContactNo, FAX, Address, City, Description, VATNo, supplierId]);
  } catch (err) {
    throw err;
  }
};

const deleteSupplier = async (supplierId) => {
  try {
    const query = 'DELETE FROM Supplier WHERE ID = ?';
    await db.query(query, [supplierId]);
   
  } catch (err) {
    throw err;
  }
};

module.exports = { createSupplier, getSupplierById, getAllSuppliers, updateSupplier, deleteSupplier };
