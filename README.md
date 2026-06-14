# Conway's Game of Life

Реализация клеточного автомата [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) на React + TypeScript + Vite.

Проект основан на туториале [freeCodeCamp](https://www.freecodecamp.org/news/create-gameoflife-with-react-in-one-hour-8e686a410174), однако с самого начала был реализован на TypeScript + Vite вместо оригинального JavaScript + CRA, а также расширен дополнительным функционалом.

🔗 **[Демо](https://game-of-life-pet-95w2.vercel.app/)**

---

## Стек

- React 19
- TypeScript
- Vite

---

## Возможности

- Ручное рисование клеток кликом по сетке
- Запуск и остановка симуляции
- Случайная генерация поля
- Очистка поля
- Пресеты паттернов: Glider, Blinker, Toad, Beacon, Pulsar
- Возраст клеток — чем дольше клетка живёт, тем темнее её цвет
- Счётчик поколений и живых клеток
- Слайдер скорости симуляции

---

## Запуск локально

```bash
git clone https://github.com/SEMATARY228/game_of_life-pet-.git
cd game_of_life-pet-/GameOfLife
npm install
npm run dev
```

Открой [http://localhost:5173](http://localhost:5173) в браузере.

---

## Источник

Туториал: [Build Conway's Game of Life with React in One Hour — freeCodeCamp](https://www.freecodecamp.org/news/create-gameoflife-with-react-in-one-hour-8e686a410174)

Список проектов: [project-based-learning](https://github.com/practical-tutorials/project-based-learning#javascript)