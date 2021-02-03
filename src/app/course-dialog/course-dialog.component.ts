import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { from, fromEvent } from 'rxjs';
import { concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
})
export class CourseDialogComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  course: Course;

  @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course
  ) {
    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required],
    });
  }

  ngOnInit() {
    // this.form.valueChanges.subscribe(console.log);

    // При каждом изменении значения внутри формы -
    // она эмитит данные, которые можно отследить в valueChanges.
    // valueChanges - позволяет отслеживать изменение значения формы.
    // Внешний Observable
    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid),

        // concatMap() - подписывается на внутренний Observable, возвращаемый из ф-ции saveCourse()
        // и отправляет значения из внутреннего Observable во внешний, в порядке очереди.
        // concatMap() не будет подписываться на следующий Observable, пока не завершится текущий.
        concatMap(changes => this.saveCourse(changes))
      )
      .subscribe(console.log);
  }

  // saveCourse() - возвращает внутренний Observable
  saveCourse(changes) {
    // fromPromise() - преобразовывает Promise в Observable 
    // (fromPromise устаревший оператор и вместо него лучше использовать from)
    // (в данном случаи именуем его как внутренний Observable)
    return fromPromise(
      // Вызов fetch() возвращает promise
      fetch(`/api/courses/${this.course.id}`, {
        method: 'PUT',
        body: JSON.stringify(changes),
        headers: {
          'content-type': 'application/json'
        }
      })
    );
  }

  ngAfterViewInit() {}

  close() {
    this.dialogRef.close();
  }
}
