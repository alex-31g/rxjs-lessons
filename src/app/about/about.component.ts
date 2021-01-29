import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { response } from 'express';
import { fromEvent, interval, noop, Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {

    const http$ = createHttpObservable('/api/courses');

    // Создаем новый Observable на базе http$
    const courses$ = http$
      // До того как была выполнена подписка с помощью subscribe(), с потоком можно работать внутри rxjs-метода pipe()
      // pipe() - позволяет чейнить несколько rxjs-операторов, чтобы создать новый Observable-поток
      .pipe(
        // map() - модифицирует значение из потока с помощью ф-ции-аргумента
        map(res => res['payload'])
      );

    // Cоздание подписчика выполняется с помощью метода subscribe(), который принимает три метода-обработчика
    courses$.subscribe(
      // 1й метод - сработает, когда в Observable произойдет событие next()
      courses => console.log(courses),

      // 2й метод - сработает, когда в Observable произойдет событие-ошибка error()
      // noop - rxjs оператор, который говорит, что в данной секции отсутствует операция
      noop,

      // 3й метод - сработает, когда в Observable произойдет событие complete()
      () => console.log('completed')
    )

  }
}
