// Import necessary modules
const express = require('express');
const cors = require('cors');

// Import route modules
const userroute = require('./routes/route.user');
const categoryRoutes = require('./routes/route.category');
const loginRoute = require('./routes/route.login');
const supplierRoute = require('./routes/route.supplier');
const itemRoutes = require('./routes/route.item');
const unitRoute = require('./routes/route.unit');
const customerRoute = require('./routes/route.customer');
const grnRoute = require('./routes/route.grn');
const dashboardRoute = require('./routes/route.dashboard');
const invoiceRoute = require('./routes/route.invoice');
const reportRoute = require('./routes/route.reports');
const widgetRoute = require('./routes/route.widgets');

// Load environment variables from .env file
require('dotenv').config();

// Create an instance of the Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes for various endpoints
app.use('/', loginRoute); // Root route for login
app.use('/category', categoryRoutes); // Route for category-related endpoints
app.use('/user', userroute); // Route for user-related endpoints
app.use('/supplier', supplierRoute); // Route for supplier-related endpoints
app.use('/customer', customerRoute); // Route for customer-related endpoints
app.use('/item', itemRoutes); // Route for item-related endpoints
app.use('/unit', unitRoute); // Route for unit-related endpoints
app.use('/grn', grnRoute); // Route for goods received note (GRN) related endpoints
app.use('/dashboard', dashboardRoute); // Route for dashboard-related endpoints
app.use('/invoice', invoiceRoute); // Route for invoice-related endpoints
app.use('/report', reportRoute); // Route for report-related endpoints
app.use('/widget', widgetRoute); // Route for widget-related endpoints

// Middleware to handle file uploads
app.use('/uploads', express.static('uploads/'));

// Configuration
const port = process.env.PORT || 8081; // Set the port number from environment variable or default to 8081
const base_url = (process.env.BASE_URL + ':' + process.env.PORT) || `http://localhost:${port}`; // Set the base URL for the server

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${base_url}`); // Log the server URL upon successful startup
});