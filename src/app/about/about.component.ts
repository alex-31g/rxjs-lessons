import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { concat, fromEvent, interval, noop, observable, Observable, of, timer, merge, Subject, zip, from, ReplaySubject, BehaviorSubject, AsyncSubject } from 'rxjs';
import { concatMap, delay, delayWhen, filter, map, take, tap, timeout } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  ngOnInit() {

  }
}
