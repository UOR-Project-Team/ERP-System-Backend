const db = require('../connection');

const getAllSuppliers = async () => {
  try {
    const query = 'SELECT ID, Title, Fullname, ContactNo, Email FROM Supplier';
    const [results] = await db.execute(query);
    return results;
  } catch (err) {
    throw err;
  }
};

const getAllItems = async (supplierId) => {
try {
    const query = 'SELECT ID, Code, Name FROM product';
    const [results] = await db.execute(query, [supplierId]);
    return results;
} catch (err) {
    throw err;
}
};

module.exports = { getAllSuppliers,  getAllItems };
