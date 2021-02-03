## concat

![](./imgs/concat.png)

```js
// of() - создает из аргументов Observable
const sourse1$ = of(10, 20).pipe(
  delay(1500)
);
const sourse2$ = of(30, 40).pipe(
  delay(3000)
);
const sourse3$ = of(50, 60).pipe(
  delay(100)
);

// concat() - объединяет полученные Observable в один.
// Пока один из полученных Observable не завершится, concat не перейдет к следующему
const result$ = concat(sourse1$, sourse2$, sourse3$);

result$.subscribe(console.log);

// РЕЗУЛЬТАТ:
// 10
// 20
// 30
// 40
// 50
// 60
```