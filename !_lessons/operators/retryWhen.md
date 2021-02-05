## retryWhen

**retryWhen** - повторно выполняет Observable в случае возникновения ошибки. В качестве аргумента ему передается функция-Observable, содержащая данные об ошибке:

*retryWhen(errors => errors)*

Запись `retryWhen(errors => errors)` аналогична оператору `retry()` и будет выпоняться до тех пор, пока Observable успешно не выполниться.   
Отличие retryWhen от retry - retryWhen позволяет добавить логику повтора к Observable.

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
  // retryWhen - повторно выполняет Observable в случае возникновения ошибки.
  // В качестве аргумента ему передается функция-Observable, содержащая данные об ошибке:
  // retryWhen(errors => errors)

  // Запись `retryWhen(errors => errors)` аналогична оператору `retry()` и будет выпоняться
  // до тех пор, пока Observable успешно не выполниться

  // Отличие retryWhen от retry - retryWhen позволяет добавить логику повтора к Observable:
  retryWhen(errors => errors.pipe(

    // delay на основе фиксированных значений
    delay(2000),

    // delay на основе значений, испускаемых другим Observable
    // delayWhen(() => timer(1000)),

    // Повторять попытку 10 раз
    take(10)
  ))
);

courses$.subscribe(
  data => console.log('data:', data),
  err => console.log('err: ', err)
);
```