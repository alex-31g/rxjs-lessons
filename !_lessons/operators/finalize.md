## finalize

**finalize** - принимает функцию, которая будет вызвана в случае завершения потока или в случае ошибки. Передаваемая функция не принимает аргументов.

```js
throwError('Fail').pipe(
  finalize(() => console.log('Finalize call'))
).subscribe(
  vl => console.log(vl),
  err => console.log('Err: ', err)
);

// Результат: 'Err: Fail', 'Finalize call'
```

**finalize() будет вызван после вызова обработчика завершения или ошибки.**