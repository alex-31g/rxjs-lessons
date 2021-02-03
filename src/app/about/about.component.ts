import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { response } from 'express';
import { concat, merge, of } from 'rxjs';
import { fromEvent, interval, noop, Observable, timer } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { fromPromise } from 'rxjs/internal-compatibility';
import { from } from 'rxjs';
import { delay, mergeMap, concatMap, switchMap, shareReplay, take, exhaustMap } from 'rxjs/operators';
import { Observer } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {

    // const http$ = createHttpObservable('/api/courses');
    // const sub = http$.subscribe(console.log);
    // setTimeout(() => sub.unsubscribe(), 10);


    // const searchBox = document.getElementById('search');
    // const keyup$ = fromEvent(searchBox, 'keyup');
    
    // keyup$
    //   .pipe(
    //     map((val: any) => val.currentTarget.value),
        
    //     debounceTime(2000),
    //     distinctUntilChanged(),
    //   )
    //   .subscribe(console.log);








  }

}
