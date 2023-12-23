const db = require('../connection');

const createSupplier = async (supplierData) => {
  try {
    const { Fullname, RegistrationNo, Email,ContactNo, Fax, Address, City, Description, VatNo } = supplierData;

    const query = 'INSERT INTO Supplier (Fullname, RegistrationNo, Email, ContactNo, Fax, Address, City, Description, VatNo, Credit, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0 ,1)';
    const [results] = await db.execute(query, [Fullname, RegistrationNo, Email, ContactNo, Fax, Address, City, Description, VatNo]);

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
    const { Fullname, RegistrationNo, Email, ContactNo, Fax, Address, City, Description, VatNo } = supplierData;

    const query = 'UPDATE Supplier SET Fullname=?, RegistrationNo=?, Email=?, ContactNo=?, Fax=?, Address=?, City=?, Description=?, VatNo=? WHERE id=?';
    await db.query(query, [Fullname, RegistrationNo, Email, ContactNo, Fax, Address, City, Description, VatNo, supplierId]);
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
