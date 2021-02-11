import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { Store } from '../common/store.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    // Инжектим класс Store из store.service
    private store: Store
  ) {}

  ngOnInit() {
    // Содержимое store находится в переменной this.store.courses$
    const courses$ = this.store.courses$.subscribe(store => console.log('Содержимое store', store));

    // Данный селектор возвращает Observable c курсами категории Beginner
    this.beginnerCourses$ = this.store.selectBeginnerCourses();

    // Данный селектор возвращает Observable c курсами категории Advanced
    this.advancedCourses$ = this.store.selectAdvancedCourses();
    
  }
}
