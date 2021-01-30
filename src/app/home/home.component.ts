import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { interval, Observable, of, timer, noop } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor() {}

  ngOnInit() {

    const http$: Observable<Course[]> = createHttpObservable('/api/courses');

    // Создаем новый Observable на базе http$
    const courses$ = http$
      // До того как была выполнена подписка с помощью subscribe(), с потоком можно работать внутри rxjs-метода pipe()
      // pipe() - позволяет чейнить несколько rxjs-операторов, чтобы создать новый Observable-поток
      .pipe(
        // tap() - выполняет ф-цию-аргумент, не изменяя значение потока
        tap(() => console.log('HTTP request executed')),

        // map() - изменяет значение потока с помощью ф-ции-аргумента
        map(res => res['payload']),

        // Каждый раз, когда происходит подписка с помощью subscribe() на courses$ Observable -
        // происходит его вызов, в следствии которого: 
        // 1) происходит запрос на сервер внутри http$ Observable, на базе которого мы создаем courses$
        // 2) происходит модификация значения из потока с помощью map(), внутри courses$ Observable
        // Поскольку beginnerCourses$ и advancedCourses$ созданы ниже на базе courses$,
        // это значит что каждый из них будет вызывать courses$.
        // В данном случаи нам бы хотелось избежать дублирования запросов на сервер, поскольку 
        // запросы происходят в одно и тоже время, и мы уверенны, что результат будет один и тот же.
        // В данном случаи нам поможет метод shareReplay().
        // shareReplay() без передачи ему аргументов - возвратит для всех подписчиков те значения,
        // которые были возвращены при первом вызове courses$ Observable, 
        // то-есть п. 1 и 2 будут выполнены всего один раз
        shareReplay()
      );

    // Cоздавать подписчика для beginnerCourses$ не нужно, так как значение этой переменной выводится в шаблон,
    // и подписка произойдет автоматически с помощью async пайпа внутри шаблона
    this.beginnerCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category == 'BEGINNER'))
      )

    // Cоздавать подписчика для beginnerCourses$ не нужно, так как значение этой переменной выводится в шаблон,
    // и подписка произойдет автоматически с помощью async пайпа внутри шаблона
    this.advancedCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category == 'ADVANCED'))
      )
  }
}
