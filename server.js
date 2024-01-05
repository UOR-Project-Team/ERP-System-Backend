const express = require('express');
const cors = require('cors');

const userroute = require('./routes/router.user')
const categoryRoutes = require('./routes/route.category');
const loginRoute = require('./routes/route.login');
const supplierRoute = require('./routes/route.supplier')
const itemRoutes = require('./routes/route.item');
const unitRoute = require('./routes/route.unit');
const customerRoute = require('./routes/route.customer');
const grnRoute = require('./routes/route.grn');
const invoiceRoute = require('./routes/route.invoice')


require('dotenv').config();
const app = express();
app.use(cors());

const port = 8081;

app.use(express.json());
app.use('/',loginRoute)
app.use('/category', categoryRoutes)
app.use('/user',userroute);
app.use('/supplier',supplierRoute);
app.use('/customer', customerRoute);
app.use('/item', itemRoutes);
app.use('/unit', unitRoute);
app.use('/grn', grnRoute);
app.use('/invoice', invoiceRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
