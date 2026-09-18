const express = require('express');
const app = express();
const port = 3000;
const helmet = require('helmet');
const path = require('path');

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'temp_files/ejs'));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/ejs', (req, res) => {
  res.render('index');
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});