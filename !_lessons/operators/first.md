## first

**first** - эмитит первое значение из потока и завершает работу.

first() является аналогом оператора take(1), за исключением того, что first() выкидывает ошибку `EmptyError` в случае, если поток оказался пустым.

**Параметры:**
- predicate (опционально) - функция для проверки условия, вызываемая для каждого значения
- defaultValue (опционально) - если указано значение по умолчанию и поток пустой - будет использоваться defaultValue, если же не указано - выкинет ошибку

```js
// ПРИМЕР 1
const stream$ = of(10, 20, 30);
const res$ = stream$.pipe(
  first()
);
res$.subscribe(console.log); // 10
```

```js
// ПРИМЕР 2 - использование ф-ции проверки условия
const stream$ = of(10, 20, 30);
const res$ = stream$.pipe(
  first(el => el == 30)
);
res$.subscribe(console.log); // 30
```

```js
// ПРИМЕР 3 - использование defaultValue
const stream$ = of(10, 20, 30);
const res$ = stream$.pipe(
  first(
    el => el == 100, 
    100
  )
);
res$.subscribe(console.log); // 100
```

```js
// ПРИМЕР 4 - пустой поток
const stream$ = of();
const res$ = stream$.pipe(
  first()
);
res$.subscribe(console.log); // error
```