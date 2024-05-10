// config.js
// Конфігураційні параметри для вашого додатку

module.exports = {
    // Параметри підключення до бази даних MongoDB
    mongoURI: 'mongodb://localhost/MVC_project_przepis',
    // Порт, на якому запускається сервер
    port: 3000,
    // Секретний ключ для підпису токенів автентифікації
    jwtSecret: 'supersecretjwtkey'
};
