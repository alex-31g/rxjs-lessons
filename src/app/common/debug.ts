import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

// ===================================
// Создание кастомного RxJs оператора 
// ===================================

// enum - набор именованных числовых констант
// Перечисления начинаются с нуля
export enum RxJsLoggingLevel {
  // TRACE - только тогда, когда я «отслеживаю» код и пытаюсь найти конкретную часть функции.
  TRACE, // 0
  DEBUG,
  INFO,
  ERROR
}

let rxjsLoggingLevel = RxJsLoggingLevel.INFO; // 2

export function setRxJsLoggingLevel(level: RxJsLoggingLevel) {
  rxjsLoggingLevel = level;
}

// Создание кастомного RxJs оператора - debug.
// В переменную debug присваиваем ф-цию высшего порядка. 
// Функция высшего порядка (Higher-order function) — функция, принимающая в качестве аргументов другие функции или возвращающая другую функцию в качестве результата. 

export const debug = (level: number, message:string) =>
  // Возвращаем ф-цию, которая на входе принимает Observable и возвращает Observable
  (source: Observable<any>) => source
    .pipe(
      tap(() => console.log('=============')),
      tap(val => {
        console.log('level ===>', level);
        console.log('rxjsLoggingLevel ===>', rxjsLoggingLevel);
        
        if (level >= rxjsLoggingLevel) {
          console.log(message + ': ', val);
        }
      }),
    );
  