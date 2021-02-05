## catchError

**catchError** - перехватывает ошибку в потоке и возвращает новый Observable, либо генерирует ошибку.

### ПРИМЕР 1: при запросе на неправильный url - возникает ошибка, которую мы перехватываем с помощью catchError() и возвращаем новый Observable

```js
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
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Request failed with status code: ' + response.status);
        }
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

const courses$: Observable<IPost[]> = createHttpObservable('https://jsonplaceholder.typicode.com/postsERROR').pipe(
  // Перехватываем ошибку и возвращаем новый Observable
  catchError(err => of(
    [{
      "userId": 1,
      "id": 1,
      "title": "sunt aut face",
      "body": "quia et susci"
    }]
  ))
);

courses$.subscribe(
  data => console.log('data:', data),
  err => console.log('err: ', err)
);
```

### ПРИМЕР 2: при запросе на неправильный url - возникает ошибка, которую мы перехватываем с помощью catchError(), внутри которого генерируем ошибку

```js
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
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Request failed with status code: ' + response.status);
        }
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

const courses$: Observable<IPost[]> = createHttpObservable('https://jsonplaceholder.typicode.com/postsERROR').pipe(
  // Перехватываем ошибку и генерируем внутри ошибку
  catchError(err => {
    console.log("Error occured", err);
    return throwError(err);
  })
);

courses$.subscribe(
  data => console.log('data:', data),
  err => console.log('err: ', err)
);
```