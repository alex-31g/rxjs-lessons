## exhaustMap


```js
// ======== ПРИМЕР 1 ======== 

// getData() - возвращает внутренний Observable
const getData = (data) => {
  return of(data).pipe(
    tap(data),
    // delay() - эмулируем задержку в 2 сек
    delay(2000)
  )
}

// interval(1000) - внешний Observable, который эмитит каждую секунду значения начиная с нуля 
interval(1000).pipe(
  tap((data) => console.log('Внешний obs:', data)),
  // Ограничиваем Observable в 21 значение
  take(21),
  // exhaustMap() - подписывается на внутренний Observable, возвращаемый из ф-ции, которую он вызывает - getData(),
  // и отправляет значения из внутреннего Observable во внешний.
  // Пока внутренний Observable не закроется, exhaustMap будет игнорировать все приходящие из внешнего Observable значения. 
  exhaustMap(data => getData(data))
).subscribe(data => console.log('exhaustMap --->', data));

// РЕЗУЛЬТАТ:
// Внешний obs: 0
// Внешний obs: 1
// Внешний obs: 2
// exhaustMap ---> 0
// Внешний obs: 3
// Внешний obs: 4
// Внешний obs: 5
// exhaustMap ---> 3
// Внешний obs: 6
// Внешний obs: 7
// Внешний obs: 8
// exhaustMap ---> 6
// Внешний obs: 9
// Внешний obs: 10
// Внешний obs: 11
// exhaustMap ---> 9
// Внешний obs: 12
// Внешний obs: 13
// Внешний obs: 14
// exhaustMap ---> 12
// Внешний obs: 15
// Внешний obs: 16
// Внешний obs: 17
// exhaustMap ---> 15
// Внешний obs: 18
// Внешний obs: 19
// Внешний obs: 20
// exhaustMap ---> 18
```

```js
// ======== ПРИМЕР 2 ======== 

// getData() - возвращает внутренний Observable
const getData = () => {
  return interval(1000).pipe(take(3));
}

// fromEvent() - внешний Observable, который эмитит данные при клике
fromEvent(document, 'click').pipe(
  // exhaustMap() - подписывается на внутренний Observable, возвращаемый из ф-ции, которую он вызывает - getData(),
  // и отправляет значения из внутреннего Observable во внешний.
  // Пока внутренний Observable не закроется, exhaustMap будет игнорировать все приходящие из внешнего Observable значения. 
  exhaustMap(() => getData())
).subscribe(console.log);

// В данном примере, при клике, exhaustMap вызывает ф-цию getData, которая эмитит данные в течении 3 секунд.
// Если в течении этих 3 секунд мы будем выполнять клики, то exhaustMap будет игнорировать их.
```