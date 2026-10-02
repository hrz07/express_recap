const express = require('express');
const app = express();
const port = 3000;
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const templeteController = require('./controllers/templete');
const tempRoute = require('./routes/templete.route');
const data = require('./MOCK_DATA.json');

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/temp', tempRoute);
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'temp_files/ejs'),
]);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', (req, res) => {
  res.json(data);
});

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const user = data.find((user) => user.id === parseInt(userId));
  res.json(user);
});

app.route('/user')
  .post(async (req, res) => {
    const newUser = { ...req.body, id: data.length + 1 };
    data.push(newUser);
    const filePath = path.join(__dirname, 'MOCK_DATA.json');
    try {
      await fs.promises.writeFile(filePath, JSON.stringify(data));
      res.status(201).send('User added successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
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