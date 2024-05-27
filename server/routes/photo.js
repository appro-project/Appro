// Імпортуємо фреймворк Express для створення маршрутів сервера.
const express = require('express');

// Створюємо новий роутер, який буде використовуватися для маршрутизації запитів.
const router = express.Router();

// Імпортуємо модель Image, яка містить логіку взаємодії з файлами зображень у файловій системі.
const Image = require("../model/image");

// Визначаємо обробник DELETE запиту на базовий шлях. Це означає, що він буде обробляти запити, які надходять на адресу /api/images (якщо базовий URL сервера - /api/images).
router.delete('/', (req, resp, next) => {
  // Отримуємо з тіла запиту список зображень для видалення.
  const { photos } = req.body;
  // Виводимо в консоль список зображень, що потрібно видалити.
  console.log('photos to unlink', photos);
  // Проходимо по кожному зображенню у списку та видаляємо його з файлової системи за допомогою методу deleteFromFS, визначеного у моделі Image.
  photos.forEach(image => Image.deleteFromFS(image));
  resp.sendStatus(200);
})

module.exports = router;
