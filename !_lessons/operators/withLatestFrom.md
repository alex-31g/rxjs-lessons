## withLatestFrom

**withLatestFrom** - получает последнее значение из переданного Observable и возвращает массив, который состоит из значения внешнего Observable и последнего значения переданного Observable.

Параметры:
- source - один или несколько Observable, последние значения которых нужно получить
- project - функция, преобразующая данные перед их отправкой во внешний Observable

```js
// Через 0мс timer c частотой 100мс начнет эмитить значения начиная с 0
const secondSource = timer(0, 100);

// interval - эмитит данные с частотой 100мс начиная с 0
interval(200).pipe(
  take(5),
  withLatestFrom(secondSource)
).subscribe(console.log);

// РЕЗУЛЬТАТ
// [0, 1]
// [1, 3]
// [2, 5]
// [3, 7]
// [4, 9]
```