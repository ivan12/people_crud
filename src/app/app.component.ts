import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PeopleState } from "./_store/people.module";
import { PeopleAction } from "./_store/_modules/people/people.action";
import { PeopleSelector } from "./_store/_modules/people/people.selector";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
@Injectable()
export class AppComponent implements OnInit {
  peopleList$: Observable<PeopleState[]>;

  constructor(private store: Store<PeopleState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(PeopleAction.loadListEffect({ payload: null }));
    this.peopleList$ = this.store.select(PeopleSelector.peopleList);
  }

  countPeople(peopleList) {
    return peopleList.length;
  }
}
