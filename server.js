const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/category', categoryRoutes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
