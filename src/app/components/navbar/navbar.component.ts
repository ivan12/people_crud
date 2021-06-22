import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PeopleSelector } from "../../_store/_modules/people/people.selector";
import { PeopleState } from "../../_store/people.module";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
@Injectable()
export class NavbarComponent {
  peopleList$: Observable<PeopleState[]> = undefined;

  constructor(private store: Store<PeopleState[]>) {
    this.peopleList$ = store.select(PeopleSelector.peopleList);
  }

  countPeople(peopleList) {
    return peopleList.length;
  }

}
