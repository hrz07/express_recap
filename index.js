const express = require('express');
const app = express();
const port = 3000;
const helmet = require('helmet');
const path = require('path');
const templeteController = require('./controllers/templete');
const tempRoute = require('./routes/templete.route');
const data = require('./MOCK_DATA.json');

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/temp', tempRoute);
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'temp_files/ejs'),
]);


app.get('/', (req, res) => {
  res.send('Hello World!');
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