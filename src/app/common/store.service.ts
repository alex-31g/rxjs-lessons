import { Injectable } from "@angular/core";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { Course } from "../model/course";
import { createHttpObservable } from "./util";
import { fromPromise } from 'rxjs/internal-compatibility';

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

  // Извлекает из store выбранный курс
  selectCourseById(courseId: number) {
    // Поскольку в методе init() был выполнен пуш данных в сабжект -
    // эти данные доступны в this.courses$
    return this.courses$
      .pipe(
        // find() - возвращает значение первого элемента в массиве, который соответствует условию в переданной функции, 
        // или undefined, если ни один элемент не удовлетворяет условию
        map((courses) => courses.find((course) => course.id == courseId)),
        // C помощью !! переводим значение в boolean:
        // если в course есть данные - получим true, если нет - false
        // filter() - фильтрует значение с помощью ф-ции -
        // если ф-ция возвращает true, то значение идет дальше по потоку, если false то значение не попадет к подписчику
        filter(course => !!course)

        // Применение оператора filter здесь нужно по след. причине:
        // когда мы обновим страницу выбранного курса, например http://localhost:4200/courses/0,
        // то в данный метод первым попадет пустой массив, поскольку мы указали, что BehaviorSubject 
        // эмит первым значением пустой массив.
      );
  }

  // Формирует массив объектов с одинаковой категорией
  filterByCategory(category: string) {
    // Поскольку в методе init() был выполнен пуш данных в сабжект -
    // эти данные доступны в this.courses$
    return this.courses$
      .pipe(
        // filter() - создает новый массив, элементы которого соответствуют условию заданному в пререданной функции 
        map((courses) => courses.filter((course) => course.category == category)));
  }

  // Данный метод обновляет данные внутри store и сохраняет данные на сервере
  saveStore(courseId: number, changes): Observable<any> {
    
    // getValue() - возвращает данные, которые Behavior subject сохранил в буфер - получаем массив курсов
    const courses = this.subject.getValue();

    // Поиск id курса
    // findIndex - возвращает индекс элемента в массиве, который соответствует условию в переданной функции, 
    // или -1 - если ни один элемент не удовлетворяет условие
    const courseIndex = courses.findIndex(course => course.id == courseId);

    // Чтобы изменить данные в store, мы должны запушить в сабжект обновленные данные.
    // Для этого необходимо создать копию массива со старыми данными и обновить в этой копии
    // тот объект, который изменил юзер:

    // 1) Создаем копию массива courses
    // slice - копирует и возвращает участок массива от begin до end, не включая end
    const newCourses = courses.slice(0);
    
    // 2) С помощью spread оператора для newCourses[courseIndex] формируем новое значение,
    // которое будет состоять из старого значения + новых изменений
    newCourses[courseIndex] = {
      ...courses[courseIndex],
      ...changes
    }

    // 3) Пушим обновленные данные в subject
    this.subject.next(newCourses);

    // Сохраняем данные на сервере и возвращаем Observable
    return fromPromise(
      fetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        body: JSON.stringify(changes),
        headers: {
          'content-type': 'application/json'
        }
      })
    );

  }
}