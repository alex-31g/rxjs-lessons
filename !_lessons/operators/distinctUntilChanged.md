## distinctUntilChanged

**distinctUntilChanged** - пропускает значение, если оно отличается от прудыдущего. Может принимать функцию сравнения нынешнего и предыдущего значения, по умолчанию undefined.

Пример: 

```js
const source$ = from([1, 1, 2, 2, 3, 3]);

source$
  .pipe(distinctUntilChanged())
  .subscribe(console.log);        // 1, 2, 3
```

### Параметр - пользовательская функция сравнения

```js
const source$ = from([
  { name: 'Brian' },
  { name: 'Joe' },
  { name: 'Joe' },
  { name: 'Sue' }
]);

source$
  .pipe(distinctUntilChanged((prev, curr) => prev.name === curr.name))
  .subscribe(console.log);
```