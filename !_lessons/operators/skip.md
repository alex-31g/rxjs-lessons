## skip

**skip** - игнорирует n значений потока и далее начинает эмитить данные.

> skip является противоположностью оператора take, который эмитит n значений и завершает поток.

```js
const source$ = of(10, 20, 30, 40, 50);
const example$ = source$.pipe(
  skip(2)
);
example$.subscribe(console.log);

// РЕЗУЛЬТАТ
// 30
// 40
// 50
```