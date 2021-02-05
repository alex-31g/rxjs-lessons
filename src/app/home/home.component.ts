import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { interval, Observable, of, timer, noop } from 'rxjs';
import { catchError, delayWhen, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
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

        shareReplay(),
        
        retryWhen(errors => errors.pipe(
          delayWhen(() => timer(200))
        ))
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
