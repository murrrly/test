const express = require('express');
const cors = require('cors'); // Добавьте эту строку
const path = require('path');
const db = require('./config/db');
const authRoutes = require('./routes/auth'); // Импорт роутов
const config = require('./config/db');
if (!config.jwtSecret || config.jwtSecret === 'cebac69ed8fa3be1a5044b727d1f9a102f9b52e0eb0bb5b5fff605949f309be1') {
  console.error('ОШИБКА: Не настроен jwtSecret!');
  process.exit(1);
}
// Роуты
const catsRouter = require('./routes/cats');
const menuRouter = require('./routes/menu');
const bookingsRouter = require('./routes/bookings');

const app = express();

app.use(cors());
// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Подключение роутов
app.use('/api/cats', catsRouter);
app.use('/api/menu', menuRouter);
app.use('/api/bookings', bookingsRouter);

app.use('/api/auth', authRoutes); // Подключение

// HTML страницы
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/menu', (req, res) => res.sendFile(path.join(__dirname, 'views', 'menu.html')));
app.get('/booking', (req, res) => res.sendFile(path.join(__dirname, 'views', 'booking.html')));
app.get('/cats', (req, res) => res.sendFile(path.join(__dirname, 'views', 'cats.html')));

const { pool, jwtSecret } = require('./config/db');

// Проверка подключения при старте сервера
app.listen(3000, async () => {
  console.log(`Сервер запущен: http://localhost:3000`);
  try {
    const connection = await pool.getConnection();
    console.log('✅ Успешное подключение к MySQL');
    connection.release();
  } catch (err) {
    console.error('❌ Ошибка подключения к MySQL:', err);
  }
});