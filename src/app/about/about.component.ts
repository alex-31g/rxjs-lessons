import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { response } from 'express';
import { concat, merge, of, throwError } from 'rxjs';
import { fromEvent, interval, noop, Observable, timer } from 'rxjs';
import { catchError, debounce, debounceTime, delayWhen, distinctUntilChanged, finalize, map, retry, retryWhen, scan, startWith, tap, throttle, throttleTime } from 'rxjs/operators';
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


  
  }

}
