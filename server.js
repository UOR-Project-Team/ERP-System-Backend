const express = require('express');
const cors = require('cors');
const session = require('express-session');

const userroute = require('./routes/Router.User')
const categoryRoutes = require('./routes/route.category');
const loginRoute = require('./routes/route.login');
const supplierRoute = require('./routes/route.supplier')
const itemRoutes = require('./routes/route.item');
const unitRoute = require('./routes/route.unit');
const customerRoute = require('./routes/route.customer');
const grnRoute = require('./routes/route.grn');
const dashboardRoute = require('./routes/route.dashboard');
const invoiceRoute = require('./routes/route.invoice')
const reportRoute = require('./routes/route.report');

require('dotenv').config();
const app = express();
app.use(cors());


const crypto = require('crypto');
const randomSessionSecret = crypto.randomBytes(32).toString('hex');
console.log(randomSessionSecret);


app.use(
  session({
    secret: randomSessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);


app.use(express.json());
app.use('/',loginRoute)
app.use('/category', categoryRoutes)
app.use('/user',userroute);
app.use('/supplier',supplierRoute);
app.use('/customer', customerRoute);
app.use('/item', itemRoutes);
app.use('/unit', unitRoute);
app.use('/grn', grnRoute);
app.use('/dashboard', dashboardRoute);
app.use('/invoice', invoiceRoute);
app.use('/report', reportRoute)

// Configuration
const port = process.env.PORT || 8081;
const base_url = (process.env.BASE_URL + ':' + process.env.PORT) || `http://localhost:${port}`;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${base_url}`);
});
