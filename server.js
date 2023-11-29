const express = require('express');
const userRoutes = require('./routes/userRoutes');
const adduserRoutes = require('./routes/AdduserRoute');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/user', adduserRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
