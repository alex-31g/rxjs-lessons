## fromEvent

**fromEvent** - создает Observable-поток на основе события.

Параметры:
- arg1 - источник события
- arg2 - название события

```js
fromEvent(document, 'click').subscribe(console.log);

// РЕЗУЛЬТАТ - при клике получаем объект события:
// MouseEvent {isTrusted: true, screenX: -1519, screenY: 573, clientX: 445, clientY: 557, …}
```

fromEvent возвращает объект Observable, который должен завершаться явно вызовом метода **unsubscribe()** (при работе с Angular - на стадии OnDestroy жизненного цикла компонента).