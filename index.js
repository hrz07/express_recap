const express = require('express');
const app = express();
const port = 3000;
const helmet = require('helmet');
const path = require('path');
const templeteController = require('./controllers/templete');
const tempRoute = require('./routes/templete.route');
const mongoose = require('mongoose');
const userRoute = require('./routes/user.route');


// middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/temp', tempRoute);
app.use('/users', userRoute);
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'temp_files/ejs'),
]);

// mongoDB connection

mongoose.connect('mongodb://127.0.0.1:27017/userDB')
  .then(() => { console.log('Connected to MongoDB') })
  .catch((err) => { console.error('Error connecting to MongoDB:', err) });

// api
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});