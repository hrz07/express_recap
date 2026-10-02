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
  const user = data.find((user)=> user.id === parseInt(userId));
  res.json(user);
});

app.post('/user', (req, res) => {
  const newUser = {...req.body, id: data.length + 1};
  data.push(newUser);
  fs.appendFile('/MOCK_DATA.json', JSON.stringify(data), (err) => {
    if (err) {
      console.error('Error writing to file:', err); 
    }
  });
  res.status(201).send('User created successfully');
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