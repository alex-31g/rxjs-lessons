## retry

**retry** - в случаи ошибки повторно выполняет Observable. В качестве необязательного параметра принимает количество повторных выполнений (по умолчанию Observable будет выполняться до тех пор, пока успешно не выполнится).

```js
interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Ф-ция createHttpObservable - выполняет сетевой запрос и возвращает Observable
function createHttpObservable() {
  return new Observable((observer: Observer<any>) => {
    let url = generateUrl();
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

// Данная функция генерирует правильный или неправильный url.
// Это необходимо, чтоб эмулировать ошибки сервера
function generateUrl() {
  const err = (Math.random() >= 0.1);
  console.log('err:', err);
  if (err) {
    return 'https://jsonplaceholder.typicode.com/postsERROR';
  } else {
    return 'https://jsonplaceholder.typicode.com/posts';
  }
}

let courses$: Observable<IPost[]> = createHttpObservable().pipe(
  // retry(n) - в случаи ошибки повторно выполняет Observable.
  // В качестве необязательного параметра принимает количество повторных выполнений
  // (по умолчанию Observable будет выполняться до тех пор, пока успешно не выполниться)
  retry(5),
);

courses$.subscribe(
  data => console.log('data:', data),
  err => console.log('err: ', err)
);
```