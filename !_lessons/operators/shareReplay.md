## shareReplay

```js
// shareReplay() - используется, когда не нужно, чтобы новый подписчик заново выполнял весь Observable (это может быть сетевой запрос), 
// вместо этого можно сделать так, чтобы новый подписчик получил последнее актуальное значение (или несколько значений) сразу после подписки.
// Под актуальными значениями подразумеваем значения, полученные предыдущим подписчиком.

// Параметры (все опциональны):
// 1par - количество значений, которые нужно сохранять и отправлять новым подписчикам
// 2par - как долго хранить значения
// 3par - планировщик

// ========== EXAMPLE 1 ==========

// ПРИМЕР 1 - без использования shareReplay()

const data$ = interval(100).pipe(
  // Observable выдает 6 значений
  take(6),
);

// Выполняем первую подписку - получим от Observable все шесть значений
data$.subscribe(vl => console.log('1 ===>', vl));

// Через 400 мс выполняем вторую подписку - получим от Observable все шесть значений
setTimeout(() => {
  console.log('Срабатывает вторая подписка');
  data$.subscribe(vl => console.log('2 ===>', vl));
}, 400);

// ========== EXAMPLE 2 ==========

// ПРИМЕР 2

const data1$ = interval(100).pipe(
  // Observable выдает 6 значений
  take(6),
  // Сохранять 2 последних значения
  shareReplay(2)
);

// Выполняем первую подписку - получим все шесть значений
data1$.subscribe(vl => console.log('1 ===>', vl));

// Через 400 мс выполняем вторую подписку - на этом этапе в буфере уже хранятся два значения 1го подписчика - это 2 и 3.
// Получаем эти значения и далее продолжаем получать все последующие значения уже от Observable с текущего места
setTimeout(() => {
  console.log('Срабатывает вторая подписка');
  data1$.subscribe(vl => console.log('2 ===>', vl));
}, 400);

// ========== EXAMPLE 3 ==========

// ПРИМЕР 3

const data2$ = interval(100).pipe(
  // Observable выдает 6 значений
  take(6),
  // Сохранять 2 последних значения
  shareReplay(2)
);

// Выполняем первую подписку - получим все шесть значений
data2$.subscribe(vl => console.log('1 ===>', vl));

// Через 2000 мс выполняем вторую подписку - на этом этапе в буфере уже хранятся два значения 1го подписчика - это 5 и 6.
// Получаем эти значения и далее при попытке продолжить получать все последующие значения уже от Observable с текущего места -
// работа заканчивается, поскольку по прошедствии 2000 мс, Observable закончил работу
setTimeout(() => {
  console.log('Срабатывает вторая подписка');
  data2$.subscribe(vl => console.log('2 ===>', vl));
}, 2000);

// ========== EXAMPLE 4 ==========

// ПРИМЕР 4

const data3$ = interval(100).pipe(
  // Observable выдает 6 значений
  take(6),
  // Использование shareReplay() без аргументов - сохранять все значения
  shareReplay()
);

// Выполняем первую подписку - получим все шесть значений
data3$.subscribe(vl => console.log('1 ===>', vl));

setTimeout(() => {
  console.log('Срабатывает вторая подписка');
  data3$.subscribe(vl => console.log('2 ===>', vl));
}, 400);

// ========== EXAMPLE 5 ==========

// ПРИМЕР 5

const data4$ = interval(100).pipe(
  // Observable выдает 6 значений
  take(6),
  // Использование shareReplay() без аргументов - сохранять все значения в течении 100 мс
  shareReplay(undefined, 100)
);

// Выполняем первую подписку - получим все шесть значений
data4$.subscribe(vl => console.log('1 ===>', vl));

setTimeout(() => {
  console.log('Срабатывает вторая подписка');
  data4$.subscribe(vl => console.log('2 ===>', vl));
}, 400);

// ========== EXAMPLE 6 ==========

// ПРИМЕР 6 - сетевой запрос

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Ф-ция createHttpObservable - выполняет сетевой запрос и возвращает Observable
function createHttpObservable(url: string) {
  return new Observable((observer: Observer<any>) => {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(body => {
        observer.next(body);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      })
  })
}

const courses$: Observable<IPost[]> = createHttpObservable('https://jsonplaceholder.typicode.com/posts').pipe(
  // shareReplay() - без передачи ему аргументов - вызовет createHttpObservable только от имени первого подписчика 
  // и возвратит всем отстальным подписчикам результат, который получил первый подписчик.
  
  // Проверить работу этого примера - перейти во вкладку Network -> XHR и выполнить 
  // данный код с методом shareReplay и без него.
  // При использовании shareReplay - будет один запрос к серверу,
  // без использования shareReplay - число запросов равно числу подписчиков
  shareReplay()
);

// Выполнив подписку три раза на courses$ - мы выполнили трижды запрос на сервер.
// Чтобы избавиться от дублирования запросов - используем метод shareReplay()
courses$.subscribe(console.log);
courses$.subscribe(console.log);
courses$.subscribe(console.log);
```