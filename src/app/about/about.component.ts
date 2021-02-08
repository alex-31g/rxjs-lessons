import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { concat, fromEvent, interval, noop, observable, Observable, of, timer, merge, Subject } from 'rxjs';
import { delayWhen, filter, map, take, timeout } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  ngOnInit() {


    // // Создание Subject - создать кастомный Observable
    // const subject = new Subject();

    // subject.next(10);
    // subject.next(20);

    // // Subject имеет те же методы, что и Observable - next, error, complete и другие.
    // // Также Subject имеет pipe - поэтому его можно использовать с любыми rxjs-операторами
    // // Subject должен быть приватным для той части приложения, которая эмитит данные.

    // // Получить Observable из Subject
    // // const series1$ = subject.asObservable();

    // // series1$ эмитит данные из subject

    // // После выполнения asObservable() - мы уже не можем использовать методы Subject'a - next, error, complete и другие,
    // // мы можем только выполнить подписку на него
    // // series1$.subscribe(console.log)


    // subject.subscribe(console.log)


    // subject.next(1);
    // subject.next(2);
    // subject.next(3);
    // subject.complete();

    

    // // Обратите внимание, что еще один очень распространенный вариант использования наших просто субъектов - это многоадресная передача Multicasting.
    // // В случае многоадресной рассылки мы хотим взять одно значение из одного наблюдаемого потока и повторно передать его в несколько отдельных выходных потоков.



// ================================================







// ================================================





}
}
