## switchMap - если требуется отправлять данные из внутреннего Observable во внешний и требуется иметь только одну последнюю подписку

```js
import { from } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';

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
  // switchMap() - подписывается на внутренний Observable, возвращаемый из ф-ции, которую он вызывает - getData(),
  // и отправляет значения из внутреннего Observable во внешний.
  // При поступлении нового значения из внутреннего Observable - 
  // switchMap() отписывается (выполняется метод unsubscribe) от предыдущего внутреннего Observable и подписывается на новый !!!
  // Таким образом мы всегда получаем один последний внутренний Observable.
  // Этот оператор умеет отменять сетевые запросы
  switchMap(param => getData(param))
).subscribe(val => console.log('switchMap:', val));

// РЕЗУЛЬТАТ:
// Внешний obs: 1
// param: 1
// Внешний obs: 2
// param: 2
// Внешний obs: 3
// param: 3
// Внешний obs: 4
// param: 4
// switchMap: data with param: 4 and delay: 7814
```