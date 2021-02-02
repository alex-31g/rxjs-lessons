## concatMap - если требуется отправлять данные из внутреннего Observable во внешний в порядке очереди

```js
import { from } from 'rxjs';
import { delay, concatMap, tap } from 'rxjs/operators';

// getData() - возвращает внутренний Observable
const getData = (param) => {
  console.log('param:', param);
  const delayTime = Math.floor(Math.random() * 10000) + 1;

  // obs$ - внутренний Observable
  const obs$ = of(`data with param: ${param} and delay: ${delayTime}`).pipe(
    // delay() - эмулируем задержку сервера
    delay(delayTime)
  )
  return obs$;
}

// from([1,2,3,4]) - внешний Observable, который эмитит массив, 
// и для каждого элемента массива нам требуется получать данные с сервера.
from([1, 2, 3 ,4]).pipe(
  tap(val => console.log('Внешний obs:', val)),
  // concatMap() - подписывается на внутренний Observable, возвращаемый из ф-ции, которую он вызывает - getData(),
  // и отправляет значения из внутреннего Observable во внешний, в порядке очереди.
  // concatMap() не будет подписываться на следующий Observable, пока не завершится текущий !!!
  concatMap(param => getData(param))
).subscribe(val => console.log('concatMap:', val));

// РЕЗУЛЬТАТ:
// Внешний obs: 1
// param: 1
// Внешний obs: 2
// Внешний obs: 3
// Внешний obs: 4
// concatMap: data with param: 1 and delay: 3672
// param: 2
// concatMap: data with param: 2 and delay: 6569
// param: 3
// concatMap: data with param: 3 and delay: 8625
// param: 4
// concatMap: data with param: 4 and delay: 758
```