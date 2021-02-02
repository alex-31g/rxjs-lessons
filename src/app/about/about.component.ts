import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { response } from 'express';
import { concat, of } from 'rxjs';
import { fromEvent, interval, noop, Observable, timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { fromPromise } from 'rxjs/internal-compatibility';
import { from } from 'rxjs';
import { delay, mergeMap, concatMap, switchMap, shareReplay, take } from 'rxjs/operators';
import { Observer } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {

    // // of() - создает из аргументов Observable
    // const sourse1$ = of(10, 20, 30);
    // const sourse2$ = of(40, 50, 60);
    // const sourse3$ = of(70, 80, 90);

    // // Задача - объединить потоки sourse1$, sourse2$ и sourse3$
    
    // // concat() - объединяет полученные Observable в один.
    // // Пока один из полученных Observable не завершится, concat не перейдет к следующему
    // const result$ = concat(sourse1$, sourse2$, sourse3$);

    // result$.subscribe(val => console.log(val)); // вывод в console - вариант 1
    // // result$.subscribe(console.log); // вывод в console - вариант 2
   

















  }

}
