/*// app.js
// Головний файл додатку, який ініціалізує та запускає сервер, налаштовує middleware та маршрути

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

// Створення екземпляру додатку Express
const app = express();

// Підключення до бази даних MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Встановлення шаблонізатора EJS
app.set('view engine', 'ejs');

// Парсер JSON
app.use(bodyParser.json());

// Парсер URL-коду
app.use(bodyParser.urlencoded({ extended: false }));

// Встановлення шляху до статичних файлів
app.use(express.static(path.join(__dirname, 'public')));

// Встановлення маршрутів
app.use('/', recipeRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// Обробка помилки 404
app.use((req, res, next) => {
    res.status(404).send("Page not found");
});

// Запуск сервера
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});*/
// app.js
// Головний файл додатку, який ініціалізує та запускає сервер, налаштовує middleware та маршрути
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

// Створення екземпляру додатку Express
const app = express();

// Конфігурація директорії з віґлядами
app.set('views', path.join(__dirname, 'views')); // Замінено 'your_views_directory' на 'views'

// Підключення до бази даних MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Встановлення шаблонізатора EJS
app.set('view engine', 'ejs');

// Парсер JSON
app.use(bodyParser.json());

// Парсер URL-коду
app.use(bodyParser.urlencoded({ extended: false }));

// Встановлення шляху до статичних файлів
app.use(express.static(path.join(__dirname, 'public')));

// Встановлення маршрутів
app.use('/', recipeRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.use(session({
  secret: config.jwtSecret, // Використовуйте секретний ключ з config.js
  resave: false,
  saveUninitialized: true
}));

// Обробка помилки 404
app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

// Запуск сервера
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
