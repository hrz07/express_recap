const express = require('express');
const app = express();
const port = 3000;
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const templeteController = require('./controllers/templete');
const tempRoute = require('./routes/templete.route');
const data = require('./MOCK_DATA.json');
const mongoose = require('mongoose');


// middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/temp', tempRoute);
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'temp_files/ejs'),
]);

// mongoDB connection

mongoose.connect('mongodb://127.0.0.1:27017/userDB')
  .then(() => { console.log('Connected to MongoDB') })
  .catch((err) => { console.error('Error connecting to MongoDB:', err) });

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
  }
});

const User = mongoose.model('User', userSchema);

// api
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', async (req, res) => {
  await User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error('Error fetching users:', err);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  await User.findById(userId)
   .then((user) => {
     res.status(200).json(user);
   })
   .catch((err) => {
     res.status(500).send('Internal Server Error: ' + err.message);
   });
});

app.route('/user')
  .post(async (req, res) => {
    await User.create({ ...req.body })
      .then((user) => {
        res.status(201).send('User added successfully');
      })
      .catch((err) => {
        console.error('Error creating user:', err);
        res.status(500).send('Internal Server Error: ' + err.message);
      });
  })
  .patch(async (req, res) => {
    const userId = req.body.id;
    const userIndex = data.findIndex((user) => user.id === parseInt(userId));
    if (userIndex === -1) {
      return res.status(404).send('User not found');
    }
    data[userIndex] = { ...data[userIndex], ...req.body, id: parseInt(userId) };
    try {
      const filePath = path.join(__dirname, 'MOCK_DATA.json');
      await fs.promises.writeFile(filePath, JSON.stringify(data));
      res.status(200).send('User updated successfully');
    } catch (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send('Internal Server Error');
    }
  })
  .delete(async (req, res) => {
    const userId = req.body.id;
    const userIndex = data.findIndex((user) => user.id === parseInt(userId));

    if (userIndex === -1) {
      return res.status(404).send('User not found');
    }
    data.splice(userIndex, 1);
    try {
      const filePath = path.join(__dirname, 'MOCK_DATA.json');
      await fs.promises.writeFile(filePath, JSON.stringify(data));
      res.status(200).send('User deleted successfully');
    } catch (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send('Internal Server Error');
    }
  });

app.get('/hbs', (req, res) => {
  res.render('index');
});

app.get('/pug', (req, res) => {
  res.render('temp');
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});