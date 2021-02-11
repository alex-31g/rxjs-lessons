import { Injectable } from "@angular/core";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Course } from "../model/course";
import { createHttpObservable } from "./util";

// К классу сервиса был применен декоратор @Injectable({ providedIn: 'root' }), 
// который говорит, что данный сервис может использоваться в других сервисах 
// или компонентах корневого модуля AppModule (root-модуль)
@Injectable({ providedIn: 'root' })
export class Store {

  // Behavior subject - хранит данные последнего эмита в буфере и отдает их всем новым подписчикам 
  // которые появились до вызова метода complete() на данном сабжекте
  private subject = new BehaviorSubject<Course[]>([]);

  // ---------
  // Метод asObservable используется для преобразования subject’а в observable - 
  // это полезно в случаях, когда подписчики должны получать данные, но необходимо запретить добавление данных в сабжект.
  courses$: Observable<Course[]> = this.subject.asObservable();

  // То-есть далее мы можем выполнять пуш данных в this.subject.next(),
  // но не можем выполнять пуш данных в this.courses$.next()
  // ---------

  // Данный метод получает данные от сервера и пушит их в сабжект
  init() {
    // createHttpObservable - метод для выполнения запросов к серверу
    const http$ = createHttpObservable('/api/courses');

    http$
      .pipe(
        // tap() - выполняет ф-цию-аргумент, не изменяя значение потока
        tap(() => console.log('HTTP request executed')),
        // map() - изменяет значение потока с помощью ф-ции-аргумента
        map((res) => Object.values(res['payload'])),
      )
      .subscribe(
        // Subject имеет те же методы, что и Observable - next, error, complete и другие.
        // Пушим данные в Subject - все подписчики subject и courses$ получат эти данные.
        courses => this.subject.next(courses)
      )
  }

  // Данный метод возвращает Observable c курсами категории Beginner
  selectBeginnerCourses() {
    return this.filterByCategory('BEGINNER');
  }

  // Данный метод возвращает Observable c курсами категории Advanced
  selectAdvancedCourses() {
    return this.filterByCategory('ADVANCED');
  }

  filterByCategory(category: string) {
    // Поскольку в методе init() был выполнен пуш данных в сабжект -
    // эти данные доступны в this.courses$
    return this.courses$
      .pipe(
        map((courses) => courses.filter((course) => course.category == category)));
  }
}