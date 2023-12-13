const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const adduserRoutes = require('./routes/AdduserRoute');
const loginRoute = require('./routes/LoginRoute');
const supplierRoute = require('./routes/SupplierRoute')
const itemRoutes = require('./routes/ItemRoute');
const unitRoute = require('./routes/UnitRoute');


const app = express();
app.use(cors());
const port = 8081;

app.use(express.json());


app.use('/',loginRoute)
app.use('/users', userRoutes);
app.use('/category', categoryRoutes)
app.use('/user', adduserRoutes);
app.use('/supplier',supplierRoute);
app.use('/supplier',supplierRoute)
app.use('/item', itemRoutes);
app.use('/unit', unitRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
