const express = require('express');
const app = express();
const port = 3000;
const helmet = require('helmet');
const path = require('path');

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('view engine', 'hbs');
app.set('view engine', 'pug');
app.set('views', [
  path.join(__dirname, 'temp_files/ejs'),
  path.join(__dirname, 'temp_files/hbs'),
  path.join(__dirname, 'temp_files/pug')
]);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/ejs', (req, res) => {
  res.render('index');
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