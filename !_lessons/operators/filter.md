## filter

**filter** - фильтрует значение с помощью ф-ции аргумента: если ф-ция возвращает true - то значение идет дальше по потоку, если false - то значение не попадет к подписчику.

```js
const stream$ = of(10, 20, 30, 40, 50);
const res$ = stream$.pipe(
  filter(el => el < 40)
);
res$.subscribe(console.log);

// РУЗУЛЬТАТ
// 10
// 20
// 30
```