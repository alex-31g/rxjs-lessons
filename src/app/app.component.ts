import { Component, OnInit } from '@angular/core';
import { Store } from './common/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(
    // Инжектим класс Store из store.service
    private store: Store
  ) {}

  ngOnInit() {
    // Данный метод вызывается один раз при запуске приложения - 
    // он получает данные от сервера 
    this.store.init();
  }
}
