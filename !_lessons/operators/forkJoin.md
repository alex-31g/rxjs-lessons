## forkJoin

**forkJoin.md** - дожидается завершения выполнения всех переданных ему Observable и возвращает новый Observable с массивом, который содержит последнее значение каждого из переданных объектов. В результирующем массиве значения переданных Observable будут расположены в том порядке, в котором Observable изначально передавались оператору.    
Выполнение переданных Observable осуществляется асинхронно.

```js
import { forkJoin, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

forkJoin([

  of(1, 2).pipe(
    delay(1000),
    tap(console.log),
  ),

  of(3, 4).pipe(
    tap(console.log),
  ),

  of(5, 6).pipe(
    delay(500),
    tap(console.log)
  )

]).subscribe(console.log);

// РЕЗУЛЬТАТ:

// 3
// 4

// 5
// 6

// 1
// 2

// [2, 4, 6]
```

**Если хотя бы один из Observable завершится ошибкой, то и результирующий Observable также выполнится с этой же ошибкой**

```js
forkJoin([

  of(1, 2).pipe(
    delay(1000),
    tap(console.log),
  ),

  of(3, 4).pipe(
    tap(console.log),
  ),

  of(5, 6).pipe(
    delay(500),
    tap(() => { throw new Error('oops!') }),
    tap(console.log)
  )

]).subscribe(console.log);

// РЕЗУЛЬТАТ:
// 3
// 4
// oops!
```