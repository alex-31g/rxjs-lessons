## take

**take** - эмитит n значений и завершает поток.

> take является противоположностью оператора skip, который игнорирует n значений.

```js
const source$ = of(10, 20, 30, 40, 50);
const example$ = source$.pipe(
  take(2)
);
example$.subscribe(console.log);

// РЕЗУЛЬТАТ
// 10
// 20
```