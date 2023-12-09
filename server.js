const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const adduserRoutes = require('./routes/AdduserRoute');
const loginRoute = require('./routes/LoginRoute');

const app = express();
app.use(cors());
const port = 8081;

app.use(express.json());

app.use('/',loginRoute)
app.use('/users', userRoutes);
app.use('/category', categoryRoutes)
app.use('/user', adduserRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
