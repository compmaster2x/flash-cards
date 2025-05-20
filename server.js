import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let db;

async function initDb() {
  db = await open({
    filename: './cards.db',
    driver: sqlite3.Database
  });

  // Создаем таблицу, если нет
  await db.run(`
    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      isRemembered INTEGER DEFAULT 0
    )
  `);

  // Если таблица пустая — добавим несколько карточек
  const count = await db.get('SELECT COUNT(*) as count FROM cards');
  if (count.count === 0) {
    await db.run(`INSERT INTO cards (question, answer, isRemembered) VALUES
      ('Столица Франции?', 'Париж', 0),
      ('2 + 2?', '4', 0),
      ('HTML расшифровывается как?', 'HyperText Markup Language', 0),
      ('JS — это?', 'JavaScript', 0),
      ('React — это?', 'JS библиотека для UI', 0),
      ('Что такое Node.js?', 'Среда выполнения JS на сервере', 0)
    `);
  }
}

app.get('/cards', async (req, res) => {
  const cards = await db.all('SELECT * FROM cards');
  // Преобразуем isRemembered из int в bool
  const formatted = cards.map(c => ({
    question: c.question,
    answer: c.answer,
    isRemembered: c.isRemembered === 1
  }));
  res.json(formatted);
});

// Опционально: можно добавить API для обновления isRemembered и т.п.

app.listen(PORT, async () => {
  await initDb();
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
