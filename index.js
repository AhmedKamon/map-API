const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const pinRoute = require('./routes/pins');
const userRoute = require('./routes/users');

const app = express();
dotenv.config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('connented to mongodb');
  })
  .catch((err) => console.log(err, 'mongo error'));

app.use('/api/pins', pinRoute);
app.use('/api/users', userRoute);

app.listen(8080, () => {
  console.log('backend is running');
});
