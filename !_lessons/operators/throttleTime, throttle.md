## throttleTime

**throttleTime** - эмитит первое значение потока, а далее, по истечению заданного интервала - последнее значение потока. Интервал задается в миллисекундах.

ПРИМЕР 1:

```js
interval(1000).pipe(
  throttleTime(2000)
).subscribe(console.log);

//Результат: 0, 3, 6, 9, 12...
```

ПРИМЕР 2:

```html
<input type="text" id="search">
```
```js
import { fromEvent } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';

const searchBox = document.getElementById('search');
const keyup$ = fromEvent(searchBox, 'keyup');

keyup$
  .pipe(
    map((data: any) => data.currentTarget.value),
    throttleTime(2000)
  )
  .subscribe(console.log);
```

В примере выше - в поле input вводим значения - в консоли моментально увидим результат сразу после первого символа.    
Далее, если в поле input будем вводить значения безостановочно в течении, например, 10с - в консоли увидим будем видеть результат каждые 2с. 

---

## throttle

**throttle** - альтернатива оператору **throttleTime**.     
Отличие от throttleTime - для задания интервала - параметром принимает ф-цию.

ПРИМЕР 1:

```js
interval(1000).pipe(
  throttle(vl => interval(2000))
).subscribe(console.log);

//Результат: 0, 3, 6, 9, 12...
```

ПРИМЕР 2:

Интервал может меняться в процессе выполнения исходного Observable в зависимости от его текущего значения.

```js
interval(1000).pipe(
  throttle(vl => interval(1000 * vl))
).subscribe(console.log);

//Результат: 0, 1, 3, 7, 15...
```