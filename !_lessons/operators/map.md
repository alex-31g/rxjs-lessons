## map

```js
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

// Observable, который эмитит массив
const data$ = of([
  {
    brand: 'porsche',
    model: '911'
  },
  {
    brand: 'ferarri',
    model: '458'
  },
  {
    brand: 'porsche',
    model: 'macan'
  },
]);

data$.pipe(
  // map() - модифицирует значение из потока с помощью ф-ции-аргумента
  map(cars => cars.filter(car => car.brand == 'porsche'))
).subscribe(cars => console.log(cars))

// РЕЗУЛЬТАТ:
// [
//   {
//     brand: 'porsche',
//     model: '911'
//   },
//   {
//     brand: 'porsche',
//     model: 'macan'
//   },
// ]
```