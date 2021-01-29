import { Observable } from 'rxjs';

export function createHttpObservable(url: string) {
  // Observable.create - создает Observable.
  // Параметром принимает ф-цию, которая описывает, 
  // как Observable будет работать со своими наблюдателями-подписчиками (observer)
  return Observable.create(observer => {

    // С помощью методов next, error, complete происходит взаимодействие с наблюдателями

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(body => {
        // next() - выдаем наблюдателям новые данные
        observer.next(body);

        // complete() - оповещаем наблюдателей, что поток завершился и новой информации не будет
        observer.complete();
      })
      .catch(err => {
        // error() - оповещаем наблюдателей об ошибке
        observer.error(err);
      })
  })
}
