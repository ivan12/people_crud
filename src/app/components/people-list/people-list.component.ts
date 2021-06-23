import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PeopleSelector } from "../../_store/_modules/people/people.selector";
import { PeopleAction } from "../../_store/_modules/people/people.action";
import { PeopleState } from "../../_store/people.module";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
@Injectable()
export class PeopleListComponent implements OnInit {
  public peopleList$: Observable<PeopleState[]> = null;
  public list = undefined;
  pesquisaForm: FormGroup;

  constructor(
    private store: Store<PeopleState>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.inicializarForm();
    this.store.dispatch(PeopleAction.loadListEffect({ payload: null }));
    this.loadPeopleList()
  }

  inicializarForm() {
    this.pesquisaForm = this.formBuilder.group({
      name: [null, Validators.required]
    });
  }

  loadPeopleList() {
    this.peopleList$ = this.store.select(PeopleSelector.peopleList);
  }

  add(people, list) {
    if (list && (list.length > 0 && list.filter(elem => elem.id == people.id).length > 0)) {
      this.store.dispatch(PeopleAction.addQuantidade({ payload: list, index: list.indexOf(list.find(elem => elem.id == people.id)) }));
    } else {
      this.store.dispatch(PeopleAction.addList({ payload: people }));
    }
  }

  loadEdit(people: any) {
    this.store.dispatch(PeopleAction.edit({ payload: people }));
  }

  pesquisar(value) {
    console.log('pesquisar value = ', value)
    this.store.dispatch(PeopleAction.pesquisar({ payload: value.name }));
  }

  setIndisponivel(people) {
    this.store.dispatch(PeopleAction.desativarEffect({ payload: people }));
  }

  recarregarLista() {
    this.inicializarForm();
    this.store.dispatch(PeopleAction.loadListEffect({ payload: null }));
  }
}
