import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { PeopleSelector } from "../../_store/_modules/people/people.selector";
import { PeopleAction } from "../../_store/_modules/people/people.action";
import { PeopleState } from "../../_store/people.module";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.scss']
})
@Injectable()
export class PeopleFormComponent implements OnInit {
  todoForm: FormGroup;
  peopleEdit$: Observable<PeopleState> = undefined;

  constructor(
    private store: Store<PeopleState>,
    private formBuilder: FormBuilder
  ) {
    this.inicializarForm();
  }

  async ngOnInit() {
    this.loadEdit()
    
  }

  loadEdit() {
    this.peopleEdit$ = this.store.select(PeopleSelector.people);

    this.peopleEdit$.pipe(
      map(peopleEdit => {
        try {
          this.todoForm.setValue(peopleEdit)
        } catch (error) {
          console.log(error)
        }
      })
    ).subscribe();
  }

  inicializarForm() {
    this.todoForm = this.formBuilder.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      birth_at: [null, Validators.required],
    });
  }

  async edit(peopleEdit) {
    this.store.dispatch(PeopleAction.editEffect({ payload: peopleEdit }));
    this.clearEdit();
  }

  clearEdit() {
    this.store.dispatch(PeopleAction.edit({ payload: null }));
  }
}
