const db = require('../connection');

const createSupplier = async (supplierData) => {
  try {
    const { Title, Fullname, Description, RegistrationNo, VatNo, Email, ContactNo, Fax, Street1, Street2, City, Country  } = supplierData;

    const query = 'INSERT INTO Supplier (Title, Fullname, Description, RegistrationNo, VatNo, Email, ContactNo, Fax, Street1, Street2, City, Country, Credit, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  0 ,1)';
    const [results] = await db.execute(query, [Title, Fullname, Description, RegistrationNo, VatNo, Email, ContactNo, Fax, Street1, Street2, City, Country]);

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
    const { Title, Fullname, Description, RegistrationNo, VatNo, Email, ContactNo, Fax, Street1, Street2, City, Country } = supplierData;

    const query = 'UPDATE Supplier SET Title=?, Fullname=?, Description=?, RegistrationNo=?, VatNo=?, Email=?, ContactNo=?, Fax=?, Street1=?, Street2=?, City=?, Country=? WHERE id=?';
    await db.query(query, [Title, Fullname, Description, RegistrationNo, VatNo, Email, ContactNo, Fax, Street1, Street2, City, Country, supplierId]);
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
