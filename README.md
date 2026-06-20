# Conway's Game of Life

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=SEMATARY228_game_of_life-pet-&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=SEMATARY228_game_of_life-pet-)

Реализация клеточного автомата [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) на React + TypeScript + Vite, с бэкендом на Express + SQLite для сохранения состояния поля.

Проект основан на туториале [freeCodeCamp](https://www.freecodecamp.org/news/create-gameoflife-with-react-in-one-hour-8e686a410174), однако с самого начала был реализован на TypeScript + Vite вместо оригинального JavaScript + CRA, а также расширен дополнительным функционалом и собственным бэкендом.

🔗 **[Демо (фронтенд)](https://game-of-life-pet-95w2.vercel.app/)**

---

## Стек

**Фронтенд:** React 19, TypeScript, Vite

**Бэкенд:** Node.js, Express, SQLite (better-sqlite3)

---

## Возможности

### Фронтенд
- Ручное рисование клеток кликом по сетке
- Запуск и остановка симуляции
- Случайная генерация поля
- Очистка поля
- Пресеты паттернов: Glider, Blinker, Toad, Beacon, Pulsar
- Возраст клеток — чем дольше клетка живёт, тем темнее её цвет
- Счётчик поколений и живых клеток
- Слайдер скорости симуляции

### Бэкенд
- Сохранение текущего состояния поля под названием
- Список всех сохранений
- Загрузка сохранённого поля
- Удаление сохранения

---

## API

| Метод  | Эндпоинт           | Описание                          |
|--------|---------------------|------------------------------------|
| POST   | `/api/boards`       | Сохранить текущее состояние поля  |
| GET    | `/api/boards`       | Получить список всех сохранений   |
| GET    | `/api/boards/:id`   | Загрузить конкретное сохранение   |
| DELETE | `/api/boards/:id`   | Удалить сохранение                |

### ERD

```
┌─────────────────────────┐
│        boards            │
├─────────────────────────┤
│ id            SERIAL PK  │
│ name          VARCHAR    │
│ grid_data     JSON/TEXT  │
│ generation    INTEGER    │
│ created_at    TIMESTAMP  │
└─────────────────────────┘
```

---

## Запуск локально

### Фронтенд

```bash
git clone https://github.com/SEMATARY228/game_of_life-pet-.git
cd game_of_life-pet-/GameOfLife
npm install
npm run dev
```

Открой [http://localhost:5173](http://localhost:5173) в браузере.

### Бэкенд

```bash
cd game_of_life-pet-/server
npm install
npm start
```

Сервер поднимется на [http://localhost:3001](http://localhost:3001). База данных (`boards.db`) создаётся автоматически при первом запуске.

> Для работы функций сохранения/загрузки на фронтенде должен быть запущен и фронт, и бэкенд одновременно.

---

## Источник

Туториал: [Build Conway's Game of Life with React in One Hour — freeCodeCamp](https://www.freecodecamp.org/news/create-gameoflife-with-react-in-one-hour-8e686a410174)

Список проектов: [project-based-learning](https://github.com/practical-tutorials/project-based-learning#javascript) 